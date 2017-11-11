<loadConfigurationModal>
<!-- Load configuration modal step 1 -->
<div class="modal fade bg-black" id="loadConfigsModal1" tabindex="-1" role="dialog" aria-labelledby="loadConfigsModalLabel1" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="loadConfigsModalLabel1">Where should we load the config from?</h5>
      </div>
      <div class="modal-body bg-black">        
        <textarea id="configurationLoadTextArea" rows="5" class="w-full" placeholder="Paste JSON here"></textarea>
        <button type="button" class="btn btn-outline-primary" onclick={loadCostConfigurationFromText}>Load from input</button>        
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={loadCostConfigurationShowStep2}>Load from api</button>
        <button id="loadFromFileButton" type="button" class="btn btn-outline-primary" onclick={showFileDialog}>
          Load from file <input id="file" type="file" style="display: none;" onChange={loadCostConfigurationFromJSON} />
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Load configuration modal step 2 -->
<div class="modal fade bg-black" id="loadConfigsModal2" tabindex="-1" role="dialog" aria-labelledby="loadConfigsModalLabel2" aria-hidden="true">
  <div class="modal-dialog bg-black" role="document">
    <div class="modal-content bg-black">
      <div class="modal-header bg-black">
        <h5 class="modal-title bg-black" id="loadConfigsModalLabel2">Load configuration</h5>
      </div>
      <div class="modal-body bg-black">
        <ul class="list-group bg-black" id="loadedConfigsListGroup">
            <li class="list-group-item bg-black" data-configid={id} each={ parent.opts.viewModel.loadedConfigurations}>{name}</li>
        </ul>
      </div>
      <div class="modal-footer bg-black">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-outline-primary" onclick={loadCostConfiguration}>Load selected</button>
      </div>
    </div>
  </div>
</div>
<script>
    // Show second step of mini wizard. Displays list of values from api
    loadCostConfigurationShowStep2(e) {
      $('#loadConfigsModal1').modal('hide');
      let self = this;
      jQuery.get('api/Configs', function(data, status) {
          self.parent.opts.viewModel.loadAllConfigurations(data);
          $('#loadedConfigsListGroup').listgroup();
          riot.update();
      }).fail(function(data) {
          alert('Failed to load configs from api: ' + data.statusText);
      });

      $('#loadConfigsModal2').modal('show');
    }

    // loads configuration from input text
    loadCostConfigurationFromText(e) {
      let jsonInput = $('#configurationLoadTextArea').val();
      try {
        let jsonInputObject = JSON.parse(jsonInput);
        this.parent.opts.viewModel.loadCostConfigurationResult(jsonInputObject);
        riot.update();
      } catch (error) {
        alert('Failed to load input');
      }
      $('#configurationLoadTextArea').val('');
      $('#loadConfigsModal1').modal('hide');
    }

    // load selected configuration from api
    loadCostConfiguration(e) {
        
        // find first and only active (selected) item and get id
        let selectedId = $("li.active").first().attr("data-configid");

        if (selectedId) {

            $('#loadConfigsModal2').modal('hide');

            let apiPath = 'api/Configs/' + selectedId
            let self = this;
            jQuery.get(apiPath, function(data, status) {
                self.parent.opts.viewModel.loadCostConfigurationResult(data);
                    // todo: error handling
                    riot.update();
                }).fail(function(data) {
                    alert('Failed to load config from api: ' + data.statusText);
                });
        }
    }

    // loads configuration from json file
    loadCostConfigurationFromJSON(e) {
      let self = this; 
      let reader = new FileReader();
      reader.onload = (function(e) {
        try {
            console.log(event.target.result);
            var obj = JSON.parse(event.target.result);
            self.parent.opts.viewModel.loadCostConfigurationResult(obj);
            $('#loadConfigsModal1').modal('hide');
        } catch (error) {
            alert ('Failed to read input :(')
        }
        riot.update();
      });
      reader.onerror = (function(e) {
          alert('Failed to read input :(');
      });
      reader.readAsText(event.target.files[0]);
      $('#file').val(null);
    }

    showFileDialog(e) {
      $("#file").click();
    }

    this.on('mount', function () {
        console.log('loadConfigurationModal mounted');
    })

</script>
</loadConfigurationModal>