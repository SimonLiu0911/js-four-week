export default {
    template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>

            <li class="page-item" :class="{ active: pages.current_page === i }" v-for="i in pages.total_pages" :key="i">
                <a class="page-link" href="#" @click.prevent="updatePage(i)">{{ i }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
    `,
    props: ['pages'],
    methods: {
        updatePage(num) {
            this.$emit('update', num);
        }
    }
}