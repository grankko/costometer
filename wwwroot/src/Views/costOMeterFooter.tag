<costOMeterFooter>
    <div class="container center-content">
        <div class="row">
            <div class="col">
                <a href="javascript:void(0)" role="button" onclick={showCurrencyModal} style="color: #fff">
                    <span class="lead m-left-15 big-text">{ opts.viewModel.getTotalCost() } { opts.viewModel.currency }</span>
                </a>
            </div>
        </div>
        <div class="row m-bottom-20">
            <div class="col">
                <a href="javascript:void(0)" role="button" class="toned-down m-left-15" onclick={showCurrencyModal}>Total hourly: { opts.viewModel.getTotalHourlyCost() } { opts.viewModel.currency } / h</a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <a href="javascript:void(0)" onclick = { runCalc } class={ opts.viewModel.getIsRunnable() ? '' : 'disabled-control' }>
                    <img src="img/play.png" alt="play" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="javascript:void(0)" onclick = { stopCalc } class={ opts.viewModel.getIsPausable() ? '' : 'disabled-control' }>
                    <img src="img/pause.png" alt="pause" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="javascript:void(0)" role="button" data-toggle="modal" data-target="#addResourceModal" onclick={loadAllConfigurations}>
                    <img src="img/add.png" alt="add resource" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="javascript:void(0)" role="button" data-toggle="modal" data-target="#resetConfigModal">
                    <img src="img/reset.png" alt="reset all resources" class="control-button" />
                </a>
            </div>                        
            <div class="col">
                <a href="javascript:void(0)" role="button" onclick={loadAllCostConfigurations}>
                    <img src="img/fetch.png" alt="load from api" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="javascript:void(0)" id="saveLinkButton" role="button" onclick={showSaveDialog} class={ opts.viewModel.getIsSaveable() ? '' : 'disabled-control' }>
                    <img id="saveLinkButtonImage" src="img/save.png" alt="save api" class="control-button" />
                </a>
            </div>                                        
        </div>
    </div>
    <script>
        runCalc(e) {
            if (opts.viewModel.getIsRunnable()) {
                opts.viewModel.startCalculator();
            }
        }

        stopCalc(e) {
            if (opts.viewModel.getIsPausable()) {
                opts.viewModel.stopCalculator();
            }
        }

        showCurrencyModal(e) {
            $('#setCurrencyModal').modal('show');
        }
        
        loadAllCostConfigurations(e) {
            $('#loadConfigsModal1').modal('show');
        }

        showSaveDialog(e) {
            if (opts.viewModel.getIsSaveable()) {
                let jsonData = opts.viewModel.serializeCurrentSetup('configuration');
                $('#saveConfigModal').modal('show');
                $('#costConfigJsonText').text(jsonData);                
            }
        }

        this.on('mount', function () {
            console.log('Footer mounted');
            riot.update();
        });

    </script>
</costOMeterFooter>