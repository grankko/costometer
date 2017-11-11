<addResourceModal>
<div class="modal fade bg-black" id="addResourceModal" tabindex="-1" role="dialog" aria-labelledby="addResourceModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="addResourceModalLabel">Add resource</h5>
      </div>
      <div class="modal-body bg-black">
        <input id="inputName" placeholder="Name" class="w-full" />
        <input id="inputCost" placeholder="Cost per hour" type="number" class="w-full" />
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={add}>Add</button>
      </div>
    </div>
  </div>
</div>
<script>

    add(e) {
      e.preventDefault()
      
      let name = $('#inputName').val();
      let cost = $('#inputCost').val();

      if (!this.parent.opts.utils.isEmptyOrSpaces(name) && !this.parent.opts.utils.isEmptyOrSpaces(cost)) {
        let consultant = this.parent.opts.viewModel.addConsultant(name, cost)

        if (this.parent.opts.viewModel.getIsRunning()) {
            consultant.start();
        }

        $('#inputName').val('');
        $('#inputCost').val('');

        $('#addResourceModal').modal('hide');
      }

      riot.update();

    this.on('mount', function () {
        console.log('addResourceModal mounted');
    })

    }
</script>
</addResourceModal>