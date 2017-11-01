<costOMeterFooter>
    <div class="container center-content">
        <div class="row">
            <div class="col">
                <span class="lead m-left-15 big-text">{ opts.viewModel.getTotalCost() } kr</span>
            </div>
        </div>
        <div class="row m-bottom-20">
            <div class="col">
                <span class="toned-down m-left-15">Total hourly: { opts.viewModel.getTotalHourlyCost() } kr / h</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <a href="#" onclick = { runCalc } class={ opts.viewModel.getIsRunnable() ? '' : 'disabled-control' }>
                    <img src="img/play.png" alt="play" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="#" onclick = { stopCalc } class={ opts.viewModel.getIsPausable() ? '' : 'disabled-control' }>
                    <img src="img/pause.png" alt="pause" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="#" role="button" data-toggle="modal" data-target="#addResourceModal" onclick={loadAllConfigurations}>
                    <img src="img/add.png" alt="add resource" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="#" role="button" data-toggle="modal" data-target="#resetConfigModal">
                    <img src="img/reset.png" alt="reset all resources" class="control-button" />
                </a>
            </div>                        
            <div class="col">
                <a href="#" role="button" onclick={loadAllCostConfigurations}>
                    <img src="img/fetch.png" alt="load from api" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="#" role="button" data-toggle="modal" data-target="#saveConfigModal">
                    <img src="img/save.png" alt="save api" class="control-button" />
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
        
        loadAllCostConfigurations(e) {
            $('#loadConfigsModal').modal('show');

            jQuery.get('api/Configs', function(data, status) {
                opts.viewModel.loadAllConfigurations(data);
                    // todo: error handling
                    riot.update();
                });
        }

        this.on('mount', function () {
            console.log('Footer mounted');
            riot.update();
        });

    </script>
</costOMeterFooter>