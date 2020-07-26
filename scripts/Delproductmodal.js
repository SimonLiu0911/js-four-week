export default {
    template: `
    <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 id="exampleModalLabel" class="modal-title">
                    <span>Delete</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"  @click="cancelloadingcircle()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                If delete
                <strong class="text-danger">{{ tempProduct.title }}</strong>, it can't recovery.
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelloadingcircle()">
                    Cancel
                </button>
                <button type="button" class="btn btn-outline-danger" @click="delProduct">
                    Delete
                </button>
            </div>
        </div>
    </div>
    `,
    props: ["tempProduct", "api", "deleteBtn"],
    methods: {
        delProduct() {
            console.log(this.deleteBtn);
            // DELETE api/{uuid}/admin/ec/product/{id}
            const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
            axios.delete(url).then((response) => {
                this.$emit('update');
                console.log(response.status);
            })
            $('#delProductModal').modal('hide');
        },
        cancelloadingcircle() {
            this.$emit('unactiveloading', this.deleteBtn);
        }
    },
}