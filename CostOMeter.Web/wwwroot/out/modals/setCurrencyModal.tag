<setCurrencyModal>
<div class="modal fade bg-black" id="currencyModal" tabindex="-1" role="dialog" aria-labelledby="currencyModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="currencyModalLabel">Set currency</h5>
      </div> 
      <div class="modal-body bg-black">
        <input id="currencyName" placeholder="Currency" class="w-full" maxlength="5" value={parent.opts.viewModel.currency} />
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={setCurrency}>Set</button>
      </div>
    </div>
  </div>
</div>
<script>
    setCurrency(e) {
        this.parent.opts.viewModel.currency = $('#currencyName').val();
        riot.update();
        $('#currencyModal').modal('hide');
    }

    this.on('mount', function () {
        console.log('setCurrencyModal mounted');
    })

</script>
</setCurrencyModal>