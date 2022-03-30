<div class="max-w-md w-full flex flex-col gap-2">
	<div>
		<h2 class="font-medium">controls</h2>
		<ul class="list-disc list-inside">
			<li>start/stop: click timer</li>
		</ul>
	</div>
	<div>
		<h2 class="font-medium">shortcuts</h2>
		<ul class="list-disc list-inside">
			<li>space: start/stop timer</li>
			<li>enter: reset/edit timer</li>
		</ul>
	</div>
	<div>
		<h2 class="font-medium">valid syntax</h2>
		<ul class="list-disc list-inside">
			<li>"30" : 30s</li>
			<li>"1:30" : 1m 30s</li>
			<li>"1:30:00" : 1h 30m</li>
			<li>"1 hour 30 minutes" : 1h 30m</li>
			<li>"1hour 30minutes" : 1h 30m</li>
		</ul>
		<div class="text-sm">
			<p>* hours: hours, hour, hrs, hr, h</p>
			<p>* minutes: minutes, minute, mins, min, m</p>
			<p>* seconds: seconds, second, secs, sec, s</p>
		</div>
	</div>
</div>

<style>
	li {
		margin-top: -0.125rem;
	}
</style>
