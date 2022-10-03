export default {
    data() {
        return {};
    },
    computed: {},
    methods: {
        back() {
            if (window.history.length >= 3) {
                this.$router.back()
            } else {
                this.$router.push('/chat')
            }
        }
    },
};