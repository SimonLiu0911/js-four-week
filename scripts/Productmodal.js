export default {
    template: `
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header border-bottom-0">
                <h5 id="exampleModalLabel" class="modal-title">UpLoad New Product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label for="imageUrl">Image URL</label>
                            <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text" class="form-control"
                                placeholder="請輸入圖片連結">
                        </div>
                        <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt>
                    </div>
                    <img class="img-fluid" alt>

                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" class="form-control" v-model="tempProduct.title"
                                placeholder="請輸入標題">
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">Category</label>
                                <input id="category" type="text" class="form-control"
                                    v-model="tempProduct.category" placeholder="請輸入分類">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">Unit</label>
                                <input id="unit" type="unit" class="form-control" v-model="tempProduct.unit"
                                    placeholder="請輸入單位">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">Price</label>
                                <input id="origin_price" type="number" class="form-control"
                                    v-model="tempProduct.origin_price" placeholder="請輸入原價">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">Selling Price</label>
                                <input id="price" type="number" class="form-control" v-model="tempProduct.price"
                                    placeholder="請輸入售價">
                            </div>
                        </div>
                        <hr>

                        <div class="form-group">
                            <label for="description">Product Description</label>
                            <textarea id="description" type="text" class="form-control"
                                v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <textarea id="description" type="text" class="form-control"
                                v-model="tempProduct.content" placeholder="請輸入說明內容"></textarea>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="styled-checkbox" id="is_enabled" type="checkbox"
                                    v-model="tempProduct.enabled">
                                <label class="styledLabel" for="is_enabled">Enabled</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-outline-secondary"
                        @click="updateProduct(tempProduct)">UpDate</button>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
        }
    },
    props: ['tempProduct', 'api'],
    methods: {
        updateProduct(tempProduct) {
            // PATCH api/{uuid}/admin/ec/product/{id}
            let url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.patch(url, tempProduct).then(response => {
                this.$emit('update');
            })
        }
    }
}