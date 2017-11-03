
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
                <div class="col-5 toned-down">
                    { hourlyCost } {opts.viewModel.currency} / h
                </div>
                <div class="col-7 toned-down">
                    { getTotalCostFormatted() } {opts.viewModel.currency}
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
      </div>
      <div class="modal-body bg-black">
        <ul class="list-group bg-black">
            <li class="list-group-item bg-black" data-configid={id} each={ opts.viewModel.loadedConfigurations}>{name}</li>
        </ul>
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={loadCostConfiguration}>Load existing</button>
        <button id="loadFromFileButton" type="button" class="btn btn-outline-primary" onclick={showFileDialog}>
          Load from file <input id="file" type="file" style="display: none;" onChange={loadCostConfigurationFromJSON} />
        </button>        
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
      </div> 
      <div class="modal-body bg-black">
        <input id="inputNewConfigurationName" placeholder="Configuratiton name" class="w-full" />
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={saveCostConfiguration}>Save</button>
      </div>
    </div>
  </div>
</div>

<!-- Set currency modal -->
<div class="modal fade bg-black" id="setCurrencyModal" tabindex="-1" role="dialog" aria-labelledby="setCurrencyModalLabel" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="setCurrencyModalLabel">Set currency</h5>
      </div> 
      <div class="modal-body bg-black">
        <input id="currencyName" placeholder="Currency" class="w-full" maxlength="5" value={opts.viewModel.currency} />
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={setCurrency}>Set</button>
      </div>
    </div>
  </div>
</div>

  <script>

    showFileDialog(e) {
      $("#file").click();
    }

    saveCostConfiguration(e) {
      let newName = $('#inputNewConfigurationName').val();
      if (!isEmptyOrSpaces(newName)) {
        let jsonData = opts.viewModel.serializeCurrentSetup(newName);
        download(jsonData,newName);
        $('#saveConfigModal').modal('hide');
        $('#inputNewConfigurationName').val('');
      }
    }
    
    loadCostConfiguration(e) {
        
        // find first and only active (selected) item and get id
        let selectedId = $("li.active").first().attr("data-configid");

        if (selectedId) {

            $('#loadConfigsModal').modal('hide');

            let apiPath = 'api/Configs/' + selectedId
            jQuery.get(apiPath, function(data, status) {
                opts.viewModel.loadCostConfigurationResult(data);
                    // todo: error handling
                    riot.update();
                }).fail(function(data) {
                    alert('Failed to load config from api: ' + data.statusText);
                });
        }
    }

    setCurrency(e) {
        opts.viewModel.currency = $('#currencyName').val();
        riot.update();
        $('#setCurrencyModal').modal('hide');
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

    function download(text, name) {
      var a = document.createElement("a");
      var file = new Blob([text], {type: 'application/json'});
      a.href = URL.createObjectURL(file);
      a.download = name + '.json';
      a.click();
    }

    loadCostConfigurationFromJSON(e) {
      var reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.onerror = onReaderError;
      reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event){
      try {
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        opts.viewModel.loadCostConfigurationResult(obj);

      } catch (error) {
        alert ('Failed to read input :(')
      }
    }

    function onReaderError(event){
        alert('Failed to read input :(');
    }    

    function supportFormData() {
      if (window.File && window.FileReader && window.FileList && window.Blob)
        return true;

      return false;
    }

    this.on('mount', function () {
        console.log('Body mounted');

        if (!supportFormData()) {
          $('#saveLinkButton').hide();
          $('#saveLinkButtonImage').hide();
          $('#loadFromFileButton').hide();
        }

        opts.viewModel.onTick = () => {
            riot.update();
        }
    })

  this.on('update', function() {
    //console.log('Tag updating');
  })

  </script>
</costOMeterBody>
