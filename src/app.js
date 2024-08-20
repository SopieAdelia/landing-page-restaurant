document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        open: false,

        toggle() {
            this.open = ! this.open
        }
    }))
})