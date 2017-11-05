<saveConfigurationModal>
<div class="modal fade bg-black" id="saveConfigModal" tabindex="-1" role="dialog" aria-labelledby="saveConfigModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="saveConfigModalLabel">Save configuration</h5>
      </div> 
      <div class="modal-body bg-black">
        <span id="costConfigJsonText">JSON goes here..</span>
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={saveCostConfiguration}>Download JSON</button>
      </div>
    </div>
  </div>
</div>
<script>
    saveCostConfiguration(e) {
        let jsonData = this.parent.opts.viewModel.serializeCurrentSetup('configuration');
        download(jsonData,'configuration');
        $('#saveConfigModal').modal('hide');
        $('#costConfigJsonText').text('');
    }

    this.on('mount', function () {
        console.log('saveConfigurationModal mounted');
    })

</script>
</saveConfigurationModal>