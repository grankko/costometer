<resetConfigurationModal>
<div class="modal fade bg-black" id="resetConfigModal" tabindex="-1" role="dialog" aria-labelledby="resetConfigModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="resetConfigModalLabel">Reset configuration</h5>
      </div>
      <div class="modal-body bg-black">
        Reset calculator and remove all resources?
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={reset}>Reset</button>
      </div>
    </div>
  </div>
</div>
<script>
    reset(e) {
        this.parent.opts.viewModel.resetViewModel();
        riot.update();
        $('#resetConfigModal').modal('hide');
    }

    this.on('mount', function () {
        console.log('resetConfigurationModal mounted');
    })

</script>
</resetConfigurationModal>