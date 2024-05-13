<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang=ts>
		import { FileDropzone } from '@skeletonlabs/skeleton';
		import { TabGroup, Tab } from '@skeletonlabs/skeleton';

		let tabSet: number = 0;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1" style="text-align: center;">Please add a .pdf or a news article URL</h1>
		<div class="flex align-items">
		<p>Age </p>
		<select class="Demographic" style="margin-left: 5px;" color="secondary-500">
			<option value="0"></option>
			<option value="1">Under 15</option>
			<option value="2">15-35</option>
			<option value="3">36-65</option>
			<option value="4">66+</option>
		</select>
		<p  style="margin-left: 10px;"> Education Level </p>
		<select class="Demographic"  style="margin-left: 5px;">
			<option value="0"></option>
			<option value="1">High School</option>
			<option value="2">Bachelor's degree</option>
			<option value="3">PHD</option>
		</select>
		<p  style="margin-left: 10px;"> Nationality </p>
		<select class="Demographic"  style="margin-left: 5px;">
			<option value="0"></option>
			<option value="1">Australian</option>
			<option value="2">New Zealand</option>
			<option value="3">England</option>
			<option value="3">United States</option>
		</select>
		<p  style="margin-left: 10px;"> Metro or regional </p>
		<select class="Demographic"  style="margin-left: 5px;">
			<option value="0"></option>
			<option value="1">Metro</option>
			<option value="2">Regional</option>
		</select>
		<p style="margin-left: 10px;">Income level</p>
		<select class="Demographic"  style="margin-left: 5px;">
			<option value="0"></option>
			<option value="1">Under $30K</option>
			<option value="2">$30K-$100K</option>
			<option value="3">$100K+</option>
		</select>
		</div>
		<div class="card" style="height: 150px;">
		<TabGroup>
			<Tab bind:group={tabSet} name="tab1" value={0}>
				<span>PDF</span>
			</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1}>News Article URL</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<FileDropzone name="files" />
				{:else if tabSet === 1}
				<div class="grow">
					<br>
					<br>
				</div>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">https://</div>
						<input type="text" placeholder="www.example.com" />
			  		</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
		</div>
		<br>
		<ul>
			<li><code class="code">https://github.com/shades87</code> - github</li>
		</ul>
	</div>
</div>
