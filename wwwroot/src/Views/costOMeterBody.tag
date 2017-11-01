
<costOMeterBody>
<div class="center-content container">
        <div each={ opts.viewModel.consultants }>
            <div class="row align-items-center">
                <div class="col-10">
                    <span class="lead">{ name }</span>
                </div>
                <div class="col-2">
                    <a href="#" onclick={ remove }>
                        <img src="img/del.png" alt="delete resource" class="del-button" />
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-12 toned-down">
                    { hourlyCost } kr / h
                </div>
            </div>
            <div class="row">
                <div class="col-12 toned-down">
                    { getTotalCostFormatted() } kr
                </div>
            </div>            
        </div>
    </div>
</div>

<!-- Add resource modal -->
<div class="modal fade bg-black" id="addResourceModal" tabindex="-1" role="dialog" aria-labelledby="addResourceModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="addResourceModalLabel">Add resource</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
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

<!-- Reset configuration modal -->
<div class="modal fade bg-black" id="resetConfigModal" tabindex="-1" role="dialog" aria-labelledby="resetConfigModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="resetConfigModalLabel">Reset configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
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

<!-- Load configuration modal -->
<div class="modal fade bg-black" id="loadConfigsModal" tabindex="-1" role="dialog" aria-labelledby="loadConfigsModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="loadConfigsModalLabel">Load configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-black">
        //todo: implement.. will now just load a test config from api
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={loadCostConfiguration}>Load</button>
      </div>
    </div>
  </div>
</div>

<!-- Save configuration modal -->
<div class="modal fade bg-black" id="saveConfigModal" tabindex="-1" role="dialog" aria-labelledby="saveConfigModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="saveConfigModalLabel">Save configuration</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body bg-black">
        //todo: implement
        <input id="inputName" placeholder="Configuratiton name" class="w-full" />
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={saveCostConfiguration}>Save</button>
      </div>
    </div>
  </div>
</div>

  <script>

    loadCostConfiguration(e) {
            
        jQuery.get('api/Configs/1', function(data, status) {
            opts.viewModel.loadCostConfigurationResult(data);
                // todo: error handling
                riot.update();
            });

        $('#loadConfigsModal').modal('hide');
    }

    saveCostConfiguration(e) {
        // todo: implement..
        $('#saveConfigModal').modal('hide');
    }      

    remove(e) {
        opts.viewModel.removeConsultant(e.item);
        riot.update();
    }

    reset(e) {
        opts.viewModel.resetViewModel();
        riot.update();
        $('#resetConfigModal').modal('hide');
    }

    add(e) {
      e.preventDefault()
      
      let name = $('#inputName').val();
      let cost = $('#inputCost').val();

      if (!isEmptyOrSpaces(name) && !isEmptyOrSpaces(cost)) {
        let consultant = opts.viewModel.addConsultant(name, cost)

        if (opts.viewModel.getIsRunning()) {
            consultant.start();
        }

        $('#inputName').val('');
        $('#inputCost').val('');

        $('#addResourceModal').modal('hide');
      }

      riot.update();
    }

    function isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    this.on('mount', function () {
        console.log('Body mounted');
        opts.viewModel.onTick = () => {
            riot.update();
        }
    })

  this.on('update', function() {
    //console.log('Tag updating');
  })

  </script>
</costOMeterBody>
