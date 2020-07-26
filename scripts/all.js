/* global Vue */
/* eslint-disable no-new */
import Pagination from './Pagination.js';
import Productmodal from './Productmodal.js';
import Delproductmodal from './Delproductmodal.js';
import Newproductmodal from './Newproductmodal.js';

Vue.component('Pagination', Pagination);
Vue.component('Productmodal', Productmodal);
Vue.component('Delproductmodal', Delproductmodal);
Vue.component('Newproductmodal', Newproductmodal);

new Vue({
    el: '#app',
    data: {
        products: [],
        pagination: {},
        tempProduct: {
            imageUrl: []
        },
        api: {
            uuid: 'd5ab7a96-794d-433e-9fc9-13fa71ebe3d6',
            path: 'https://course-ec-api.hexschool.io/api/'
        },
        token: '',
        isNew: '',
        lockingBtn: '',
        deleteBtn: '',
    },
    methods: {
        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    $('#newproductModal').modal('show');
                    break;
                case 'edit':
                    this.lockingBtn = item.id;
                    const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
                    axios.get(url).then((response) => {
                        this.tempProduct = response.data.data;
                        $('#productModal').modal('show');
                    });
                    break;
                case 'delete':
                    this.deleteBtn = item.id;
                    $('#delProductModal').modal('show');
                    this.tempProduct = Object.assign({}, item);
                    break;
                default:
                    break;
            }
        },
        getProducts(num = 1) {
            const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url).then((response) => {
                this.products = response.data.data;
                this.pagination = response.data.meta.pagination;
                if (this.tempProduct.id) {
                    this.tempProduct = {
                        imageUrl: []
                    };
                    $('#productModal').modal('hide');
                };
            });
        },
        patchItem(item, num = 1) {
            // api/{uuid}/admin/ec/product/{id}
            const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
            axios.patch(url, {
                "enabled": !item.enabled
            }).then((response) => {
                console.log(response.data.data.enabled)
            });
        },
        unactiveloading() {
            this.deleteBtn = '';
        }
    },
    created() {
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`; // 將token做為預設值發送
        this.getProducts();

        this.$nextTick(() => {
            $("#productModal").on("hidden.bs.modal", (event) => {
                this.lockingBtn = '';
            });
        });
    }
});

// 前端分頁：一般用於數據量較小的情況，一次跟後端請求全部數據回來。
// 後端分頁：一般用於數據量較大的情況，可以減少前端請求數據的壓力。前端需要將每頁條數和當前頁傳給後端，後端根據條件查詢出數據再傳給前端，包括總條數、當前頁、每頁多少條數據等。