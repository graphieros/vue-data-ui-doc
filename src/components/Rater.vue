<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "../stores";
import BaseBubbles from "./BaseBubbles.vue";

const store = useMainStore();
const isDarkMode = computed(() => store.isDarkMode);

const props = defineProps({
    itemId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    }
})

function submitRating() {
    const apiUrl = 'https://vue-data-ui.graphieros.com/api/rate.php';

    confirmed.value = true;

    if (rating.value < 1 || rating.value > 5) {
        console.warn("Please provide a rating between 1 and 5.");
        return;
    }

    if (!localStorage.visitor) {
        localStorage.setItem('visitor', createUid())
    }

    const requestData = {
        item_id: props.itemId,
        rating: rating.value,
        user_id: localStorage.getItem('visitor')
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requestData) 
    })
    .then(response => response.json())
    .then(_data => {
        done.value = true;
        setTimeout(() => {
            const votes = JSON.parse(localStorage.votes);
            votes.push({
                itemId: props.itemId,
                rating: rating.value
            });

            localStorage.setItem('votes', JSON.stringify(votes));
            visible.value = false;
        }, 2000);
    })
    .catch(error => {
        console.error(error);
    });
}

const config = computed(() => {
    return {
        type: 'star',
        readonly: done.value,
        style: {
            backgroundColor: 'transparent',
            star: {
                inactiveColor: isDarkMode.value ? '#3A3A3A': '#6A6A6A'
            },
            rating: {
                show: false
            },
            title: {
                text: props.title || labels.value.title[store.lang],
                color: isDarkMode.value ? '#CCCCCC' : '#1A1A1A',
                fontSize: 16
            }
        }
    }
})

const rated = ref(false);
const rating = ref(3);
const done = ref(false);
const visible = ref(true);
const confirmed = ref(false);

function setRating(v) {
    rated.value = true;
    rating.value = v;
}

const alreadyRated = computed(() => {
    const votes = JSON.parse(localStorage.votes);
    if (!votes || !Array.isArray(votes)) return false;
    return votes.map(v => v.itemId).includes(props.itemId)
})

const labels = computed(() => {
    return {
        r8: {
            en: "Submit",
            fr: "Envoyer",       
            pt: "Enviar",        
            de: "Absenden",      
            zh: "提交",           
            jp: "送信",           
            es: "Enviar",        
            ko: "제출",           
            ar: "إرسال"           
        },
        thx: {
            en: 'Thank you!',
            fr: 'Merci !',
            pt: 'Obrigado(a)!',
            de: 'Danke!',
            zh: '谢谢！',
            jp: 'ありがとう！',
            es: '¡Gracias!',
            ko: '고마워요!',
            ar: 'شُكرًا لك!'
        },
        title: {
            en: "Rate this component!",
            fr: "Évaluez ce composant !",
            pt: "Avalie este componente!",
            de: "Bewerten Sie diese Komponente!",
            zh: "为此组件评分！",
            jp: "このコンポーネントを評価してください！",
            es: "¡Califica este componente!",
            ko: "이 컴포넌트를 평가하세요!",
            ar: "قيّم هذا المكون!"
        }
    }
})

</script>

<template>
    <Transition name="fade">
        <div v-if="!alreadyRated && visible && store.ratings.show" class="relative w-fit flex flex-col justify-center place-items-center gap-3 mx-auto my-4 bg-gray-100 dark:bg-[#242424] p-4 rounded-xl shadow-md shadow[inset_0_2px_2px_#FFFFFF,0_4px_6px_rgba(0,0,0,0.1)]
        dark:shadow-[inset_0_2px_2px_#4A4A4A,0_4px_6px_rgba(0,0,0,0.5)]">
            <VueUiRating
                :dataset="{ rating }"
                :config="config"
                @rate="setRating"
            />
            <button
                class="
                    whitespace-nowrap 
                    py-1 
                    px-4 
                    outline 
                    rounded-full 
                    bg-gradient-to-br
                    disabled:from-[#8A8A8A]
                    disabled:to-[#9A9A9A]
                    dark:disabled:from-[#242424]
                    dark:disabled:to-[#242424]
                    dark:disabled:outline-[#3A3A3A]
                    dark:disabled:text-[#5A5A5A]
                    from-[#f7e6b0]
                    to-[#f5bb0a]
                    disabled:text-[#CCCCCC]
                    disabled:cursor-not-allowed
                    text-black
                    "
                :disabled="!rated || done"
                @click="submitRating"
            >
                {{ done ? labels.thx[store.lang] : labels.r8[store.lang] }}
            </button>
            <BaseBubbles v-if="confirmed" class="absolute" random-color palette="celebration" />
        </div>
    </Transition>
</template>