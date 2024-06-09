<script setup>
import { ref } from "vue";
import { createWordCloudDatasetFromPlainText} from "vue-data-ui";

const dataset = ref(createWordCloudDatasetFromPlainText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pulvinar pretium venenatis. Donec imperdiet elit id porttitor tristique. Aenean ac commodo justo. Vestibulum placerat molestie nisl, sit amet lacinia nulla posuere quis. Aenean ullamcorper eu ex vitae facilisis. Aliquam erat volutpat. Proin nunc felis, porttitor quis commodo lacinia, gravida sed orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus mattis vitae tellus ac luctus. Vestibulum faucibus sem nec varius eleifend. In gravida venenatis ipsum sit amet ultricies. Nam efficitur, dui ac imperdiet vestibulum, justo metus consectetur libero, posuere tempor neque magna vitae augue. Etiam gravida massa quis turpis vulputate, ac tempus nisi imperdiet. Donec at laoreet ligula. Nulla id ex sagittis, tincidunt lectus ut, gravida mauris. Nulla consectetur semper sem. Maecenas lacinia facilisis ex, lobortis lacinia orci ornare tristique. Nam quis erat a nunc vehicula finibus. Quisque vitae nibh condimentum, condimentum erat eu, finibus risus. Duis sodales orci vel ullamcorper ullamcorper. In hac habitasse platea dictumst. Vivamus tempus ut nulla id commodo. Cras lectus sem, porttitor id sem eu, posuere fringilla turpis. Integer pretium erat sed ipsum gravida ullamcorper. Nam facilisis metus non lorem congue imperdiet. Sed quis cursus eros. Pellentesque venenatis pellentesque turpis suscipit accumsan. Nam arcu quam, faucibus et arcu pretium, eleifend consequat lacus. Aliquam nec risus nec justo maximus ultricies at et velit. Nam at lacinia massa. Sed elit dolor, consequat in massa at, egestas accumsan ex. Aenean quis suscipit ipsum, ac condimentum eros. Sed eleifend nisi arcu, et iaculis mi semper quis. Mauris vel dui nisi. Fusce finibus lacus a tempus tristique. Sed molestie orci a velit facilisis ornare. Pellentesque ullamcorper sed velit ut iaculis. Fusce urna dolor, rutrum sit amet consequat et, vulputate a risus. Sed faucibus sem nec urna lobortis dapibus. Nam in nisl a dui euismod gravida non in erat. Cras lobortis vitae diam sed elementum. Sed cursus tempor enim, nec ornare sem facilisis non. Pellentesque euismod sit amet magna eget tempor. Proin tincidunt dignissim nulla vitae molestie. Proin gravida ac urna ut facilisis. Vestibulum sit amet ex non quam ornare scelerisque. Etiam pharetra magna neque. Cras maximus, ipsum at imperdiet interdum, nibh orci vulputate erat, vitae varius elit lectus sed nibh. Maecenas eget nulla ultricies, pharetra ante non, cursus risus. Mauris nec felis tincidunt, viverra lectus quis, feugiat tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas vitae pharetra leo. Vestibulum at accumsan ipsum, id pharetra dui. Pellentesque nibh purus, tincidunt a egestas in, dapibus quis nunc. Integer posuere tellus id mi tincidunt aliquet. Donec vel justo et eros eleifend tempor in in purus. Aenean id pellentesque nisl, eget vestibulum neque.Nulla ante mauris, posuere vel consequat vitae, suscipit id magna. In ipsum nisi, luctus quis interdum sagittis, condimentum at felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean interdum massa quis ullamcorper luctus. Duis efficitur mauris a eros porta ornare vitae nec urna. Fusce tincidunt purus sit amet urna convallis, ac molestie felis suscipit. Sed scelerisque orci vel velit suscipit, non posuere dui fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum velit libero, commodo at fringilla at, congue ut felis. Nulla vestibulum a ligula vel luctus. Nam at nunc erat. Nam tincidunt porta lectus eget molestie. Cras quis placerat est. Donec tellus magna, sollicitudin ac efficitur sed, auctor eget dui. Fusce eget sem magna. Donec fermentum velit lorem, quis suscipit odio posuere eu. Proin nunc arcu, pretium id gravida ut, mattis non erat. Aenean eu nisl et ligula pulvinar hendrerit. Pellentesque pharetra hendrerit sodales. Nam in justo dictum, egestas mauris nec, venenatis nisl. Mauris vehicula dolor metus, sed aliquam enim consequat vel. Suspendisse semper orci in leo rutrum volutpat. Aenean varius mauris diam. Sed ornare lacus turpis, eu tempor quam porta nec. Etiam suscipit quam enim, a consequat libero lacinia sed. Quisque eu justo eu orci sagittis pulvinar.Aenean augue tortor, porta nec augue ut, mollis ultricies nisi. Vestibulum iaculis pellentesque risus non efficitur. Proin eu sapien vel lectus blandit eleifend vel ac est. Maecenas quis massa sodales, pretium leo sed, fringilla elit. Sed a pellentesque felis. Phasellus quam sapien, vulputate ut sapien id, maximus tincidunt tellus. Nullam rhoncus mauris id pretium tincidunt. Nulla orci orci, molestie sollicitudin mollis in, ultricies sit amet ligula. Phasellus est nisi, condimentum eu lobortis a, posuere non lacus. Suspendisse vitae aliquam libero. Nunc sollicitudin neque at odio vulputate pulvinar quis nec nunc. Nullam vehicula nulla massa, vitae sodales nibh porttitor ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc rhoncus non erat quis blandit.
Maecenas convallis libero at nisl lacinia facilisis. Nulla facilisi. Sed bibendum imperdiet massa. In nunc ipsum, maximus ac viverra non, pellentesque eget diam. Donec lobortis erat in nibh rhoncus, sit amet tincidunt urna vehicula. Cras iaculis, sapien quis convallis tristique, libero eros fermentum lorem, tristique luctus ante nulla at libero. Nulla fringilla eget ligula aliquet vulputate. Donec enim ex, hendrerit at lacinia quis, ultrices eget quam. Curabitur condimentum leo neque, ac rhoncus sapien euismod eu. Suspendisse tristique ullamcorper sapien, sed tincidunt enim commodo a. Aliquam risus sapien, interdum et temporvel, placerat ut quam. Ut turpis orci, pellentesque non eros at, suscipit placerat augue. Donec eget nisi lacus. Morbi id enim metus. Mauris ut sem malesuada, convallis lectus sit amet, dapibus arcu. Nulla tempor justo eu orci egestas vehicula. Donec bibendum erat libero, placerat lacinia elit luctus at. Pellentesque semper erat metus, sed volutpat nunc imperdiet a. Fusce vitae orci libero. Curabitur laoreet felis eget odio pulvinar pulvinar. Morbi elementum purus ut nibh tristique, id efficitur neque condimentum. Vestibulum porttitor bibendum pharetra. Nulla dapibus quam vel elit tincidunt, vestibulum pretium elit efficitur. Vestibulum nec ligula nec purus suscipit dictum laoreet quis risus. Maecenas non nibh ac eros ultrices maximus. Nullam pulvinar neque nec ipsum porta malesuada. Phasellus vestibulum faucibus vehicula. Vestibulum risus lectus, efficitur eu luctus ac, pellentesque in nisi. Fusce vitae ullamcorper purus, at molestie leo. Proin sed diam sollicitudin, ullamcorper eros sit amet, egestas sapien. Phasellus rutrum.`));

const config = ref({
    style: {
        chart: {
            title: {
                text: "Title",
                subtitle: {
                    text: "Subtitle"
                }
            }
        }
    }
})

</script>

<template>
    <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center w-full p-4 bg-gray-200 dark:bg-[#3A3A3A] rounded-md">
        <div class="w-full shadow-md">
            <code>theme: "" (default)</code>
            <VueDataUi component="VueUiWordCloud" :dataset="dataset" :config="{...config, theme: ''}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "zen"</code>
            <VueDataUi component="VueUiWordCloud" :dataset="dataset" :config="{...config, theme: 'zen'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "concrete"</code>
            <VueDataUi component="VueUiWordCloud" :dataset="dataset" :config="{...config, theme: 'concrete'}" />
        </div>
        <div class="w-full shadow-md">
            <code>theme: "hack"</code>
            <VueDataUi component="VueUiWordCloud" :dataset="dataset" :config="{...config, theme: 'hack'}" />
        </div>
    </div>
</template>