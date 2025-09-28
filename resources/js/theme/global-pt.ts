/**
 * Global pass through styling for components
 * https://primevue.org/passthrough/#global
 */
export default {
    dialog: {
        root: {
            class: 'm-4 sm:m-0'
        },
    },
    toast: {
        root: {
            // Full width/centered on mobile, bottom right desktop
            class: 'fixed! left-4! right-4! bottom-4! w-auto! md:right-8! md:bottom-8! sm:w-[25rem]! sm:not-fixed! sm:left-auto! sm:ml-auto!'
        },
        message: {
            class: 'shadow-lg mb-0 mt-4'
        },
    },
}