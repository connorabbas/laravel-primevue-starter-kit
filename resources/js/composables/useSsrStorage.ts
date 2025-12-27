import { ref, onMounted, watch, Ref } from 'vue'
import { useStorage } from '@vueuse/core'

export function useSsrStorage<T>(key: string, defaultValue: T) {
    const storage = useStorage(key, defaultValue)
    const state = ref(defaultValue) as Ref<T>

    onMounted(() => {
        state.value = storage.value

        // Keep them in sync
        watch(state, (val) => {
            storage.value = val
        })
    })

    return state
}
