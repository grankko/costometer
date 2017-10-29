<costOMeterFooter>
    <div>
        <div style="float: right;">
            <span style="margin: 10px;">Cost: { opts.viewModel.getTotalCost() } kr</span>
            <span style="margin: 10px;">Total hourly: { opts.viewModel.getTotalHourlyCost() } kr / h</span>
        </div>
        <div>
            <a href="#" onclick = { runCalc } style={ opts.viewModel.getIsRunnable() ? '' : 'opacity: 0.2;' }>
                <img src="img/play.png" alt="play" style="height: 50px;" />
            </a>
            <a href="#" onclick = { stopCalc } style={ opts.viewModel.getIsPausable() ? '' : 'opacity: 0.2;' }>
                <img src="img/pause.png" alt="pauseplay" style="height: 50px;" />
            </a>
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