<costOMeterFooter>
    <div class="center-content">

        <div class="row">
            <div class="col">
                <a href="#" onclick = { runCalc } class={ opts.viewModel.getIsRunnable() ? '' : 'disabled-control' }>
                    <img src="img/play.png" alt="play" class="control-button" />
                </a>
            </div>
            <div class="col">
                <a href="#" onclick = { stopCalc } class={ opts.viewModel.getIsPausable() ? '' : 'disabled-control' }>
                    <img src="img/pause.png" alt="pauseplay" class="control-button" />
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="lead m-left-15">Total cost: { opts.viewModel.getTotalCost() } kr</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="toned-down m-left-15">Total hourly: { opts.viewModel.getTotalHourlyCost() } kr / h</span>
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

        this.on('mount', function () {
            console.log('Footer mounted');
            riot.update();
        });

    </script>
</costOMeterFooter>