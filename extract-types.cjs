const ts = require('typescript');
const fs = require('fs');
const path = require('path');

function extractTypesFromModule(filePath) {
  const program = ts.createProgram([filePath], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);
  const seenTypes = new Set();

  const typeInfo = [];

  function visit(node) {
    if (ts.isModuleDeclaration(node) && node.name.text === 'vue-data-ui') {
      ts.forEachChild(node.body, visit);
    }

    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      const members = extractInterfaceMembers(node);

      typeInfo.push({
        kind: 'interface',
        name: interfaceName,
        members: members,
      });
    } else if (ts.isTypeAliasDeclaration(node)) {
      const typeName = node.name.text;
      const type = checker.getTypeAtLocation(node);
      const typeString = checker.typeToString(type);

      typeInfo.push({
        kind: 'type',
        name: typeName,
        type: typeString,
        details: extractTypeDetails(type),
      });
    } else if (ts.isEnumDeclaration(node)) {
      const enumName = node.name.text;
      const members = node.members.map(member => member.name.getText());

      typeInfo.push({
        kind: 'enum',
        name: enumName,
        members: members,
      });
    }
  }

  function extractInterfaceMembers(node) {
    const members = [];

    node.members.forEach(member => {
      const memberName = member.name.getText();
      const memberType = checker.getTypeAtLocation(member);
      const memberTypeString = checker.typeToString(memberType);
      const details = extractTypeDetails(memberType);

      members.push({
        name: memberName,
        type: memberTypeString,
        optional: member.questionToken ? true : false,
        isReadonly: member.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ReadonlyKeyword) || false,
        details: details,
      });
    });

    return members;
  }

  function extractTypeDetails(type) {
    const typeId = checker.typeToString(type);
    if (seenTypes.has(typeId)) {
      return { name: typeId, circular: true };
    }
    seenTypes.add(typeId);

    if (type.flags & ts.TypeFlags.Union) {
      return {
        kind: 'union',
        types: type.types.map(t => checker.typeToString(t)),
      };
    } else if (type.flags & ts.TypeFlags.Intersection) {
      return {
        kind: 'intersection',
        types: type.types.map(t => checker.typeToString(t)),
      };
    } else if (type.flags & ts.TypeFlags.Object) {
      return extractObjectTypeDetails(type);
    }
    return { name: checker.typeToString(type) };
  }

  function extractObjectTypeDetails(type) {
    const properties = type.getProperties();
    const details = [];

    properties.forEach(prop => {
      const propType = checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration);
      const propTypeString = checker.typeToString(propType);
      const optional = prop.flags & ts.SymbolFlags.Optional;

      details.push({
        name: prop.getName(),
        type: propTypeString,
        optional: optional,
        details: extractTypeDetails(propType),
      });
    });

    return { kind: 'object', properties: details };
  }

  ts.forEachChild(sourceFile, visit);
  return typeInfo;
}

const filePath = path.resolve(__dirname, 'node_modules/vue-data-ui/dist/types/vue-data-ui.d.ts');

if (!fs.existsSync(filePath)) {
  console.error('File does not exist:', filePath);
  process.exit(1);
}

const types = extractTypesFromModule(filePath);

if (types.length === 0) {
  console.warn('No types found in the .d.ts file');
} else {
  fs.writeFileSync('types.json', JSON.stringify(types, null, 2));
  console.log('Type information extracted and written to types.json');
}
