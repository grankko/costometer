<costOMeterFooter>
    <div class="center-content">

        <div class="row">
            <div class="col">
                <a href="#" onclick = { runCalc } style={ opts.viewModel.getIsRunnable() ? '' : 'opacity: 0.2;' }>
                    <img src="img/play.png" alt="play" style="height: 50px; margin-left: 15px;" />
                </a>
            </div>
            <div class="col">
                <a href="#" onclick = { stopCalc } style={ opts.viewModel.getIsPausable() ? '' : 'opacity: 0.2;' }>
                    <img src="img/pause.png" alt="pauseplay" style="height: 50px; margin-left: 15px;" />
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="lead" style="margin-left: 15px;">Cost: { opts.viewModel.getTotalCost() } kr</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="lead"  style="margin-left: 15px;">Total hourly: { opts.viewModel.getTotalHourlyCost() } kr / h</span>
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