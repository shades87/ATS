<!-- This is how to comment -->
<script lang=ts>
		import { FileDropzone, type ModalSettings } from '@skeletonlabs/skeleton';
		import { TabGroup, Tab } from '@skeletonlabs/skeleton';
		import { getModalStore } from '@skeletonlabs/skeleton';

		const modalStore = getModalStore();

		let user = {
			age: 0,
			ed: 0,
			nat: 0,
			city: 0,
			income: 0
		}

		let age:string = "";
		let ed:string = "";
		let nat:string = "";
		let city:string = "";
		let income:string = "";

		let tabSet: number = 0;
		
		
		const handleAge = () => {
			console.log(user.age)
			switch (+user.age) {
				case 1:
					console.log("in case 1:")
					age = "under 15";
					console.log(age)
					break;
				case 2:
					age = "15 to 35";
					break;
				case 3:
					age = "35-65";
					break;
				case 4:
					age = "65+";
					break;
				case 0:
					age: "";
					break;
			}
			
		}

		const handleSummarize = () => {
			const modal: ModalSettings = {
				type: 'alert',
				title: 'Example Alert',
				body: 'This is an example modal.',
				image: 'https://i.imgur.com/WOgTG96.gif'
		}
		modalStore.trigger(modal);
	}

		const handleEd = () => {
			switch (+user.ed) {
				case 1:
					ed = "high school";
					break;
				case 2:
					ed = "university";
					break;
				case 3:
					ed = "PHD";
					break;
				case 0:
					ed = "";
					break;
			}
		}

		const handleNat = () => {
			switch (+user.nat) {
				case 1:
					nat = "Australian";
					break;
				case 2:
					nat = "New Zealand";
					break;
				case 3:
					nat = "England";
					break;
				case 4:
					nat = "US";
					break;
				case 0:
					nat = "";
					break;
			}
		}

		const handleCity = () => {
			switch (+user.city) {
				case 1:
					city = "metro";
					break;
				case 2:
					city = "regional";
					break;
				case 0:
					city = "";
					break;
			}
		}

		const handleIncome = () => {
			switch (+user.income) {
				case 1:
					income = "under 30K";
					break;
				case 2:
					income = "30K-100K";
					break;
				case 3:
					income = "100K+";
					break;
				case 0:
					income = "";
					break;
			}
		}

		const clearAll = () =>{
			user.age=0; age = "";
			user.ed = 0; ed = "";
			user.nat = 0; nat = "";
			user.city = 0; city = "";
			user.income = 0; income = "";
		}

		let files: FileList;
		
		function handleRemoveFile(){
			
			
		}

		function onUploadFile(e: Event): void {
	console.log('file data:', e);
}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1" style="text-align: center;">ATS targeted to your demographic</h1>
		<div class="card p-4">
			<br>
			<h1 class="h1" style="text-align: center;">Choose your demographics (or leave them blank)</h1>
			<br>
			<div class="flex align-items">
				<p style="margin-left: 10px; margin-right: 10px;">Age </p>
				<select class="select" name="Age" bind:value={user.age} on:change={handleAge}>
					<option value="0"></option>
					<option value="1">Under 15</option>
					<option value="2">15-35</option>
					<option value="3">36-65</option>
					<option value="4">66+</option>
				</select>
				<p  style="margin-left: 10px; margin-right: 10px;"> Education Level </p>
				<select class="select" name="Ed" bind:value={user.ed} on:change={handleEd}>
					<option value="0"></option>
					<option value="1">High School</option>
					<option value="2">Bachelor's degree</option>
					<option value="3">PHD</option>
				</select>
				<p  style="margin-left: 10px; margin-right: 10px;"> Nationality </p>
				<select class="select" name="Nation" bind:value={user.nat} on:change={handleNat}>
					<option value="0"></option>
					<option value="1">Australian</option>
					<option value="2">New Zealand</option>
					<option value="3">England</option>
					<option value="3">United States</option>
				</select>
				<p  style="margin-left: 10px; margin-right: 10px;"> Metro or regional </p>
				<select class="select" name="Metro" bind:value={user.city} on:change={handleCity}>
					<option value="0"></option>
					<option value="1">Metro</option>
					<option value="2">Regional</option>
				</select>
				<p style="margin-left: 10px; margin-right: 10px;">Income level</p>
				<select class="select" name = "Income" bind:value={user.income} on:change={handleIncome}>
					<option value="0"></option>
					<option value="1">Under $30K</option>
					<option value="2">$30K-$100K</option>
					<option value="3">$100K+</option>
				</select>
				
			</div>
			<button type="button" class="btn variant-filled float-right" style="margin: 10px;" on:click={clearAll}>clear all demographics</button>
			<br>
			<br>
		</div>
		<div class="card">
			<h1 class="h1" style="text-align: center;">Upload a PDF or enter a URL to a news article</h1>
			<TabGroup>
				<Tab bind:group={tabSet} name="tab1" value={0}>
					<span>PDF</span>
				</Tab>
				<Tab bind:group={tabSet} name="tab2" value={1}>News Article URL</Tab>
				<!-- Tab Panels --->
				<svelte:fragment slot="panel">
					{#if tabSet === 0}
						<div>
							<FileDropzone name="files" accept=".PDF"  on:change={onUploadFile} bind:files={files}/>
							{#if files && files.length > 0} 
								<p>Your file is {files[0].name}</p>
							{/if}
							<button type="button" class="btn variant-filled float-right" style="margin: 10px;" on:click={handleRemoveFile}>clear file</button>
						</div>
					{:else if tabSet === 1}
						<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
							<div class="input-group-shim">https://</div>
							<input type="text" placeholder="www.example.com" />
						</div>
						<button type="button" class="btn variant-filled float-right" style="margin: 10px;">clear url</button>
					{/if}
				</svelte:fragment>
				<br>
				<br>
			</TabGroup>
		</div>
		<button type="button" class="btn variant-filled float-right"style="margin: 10px;" on:click={handleSummarize}>summarise!</button>
		<br>
		<bv>
		<br>
		<br>
		<div class="card" style="width: auto">
			{#if tabSet === 0}
			<p>User is summarising a PDF</p>
			{:else if tabSet === 1}
			<p>User is summarising a URL</p>
			{/if}
			<p>
				User is {age}, {city}, {ed}, {income} and {nat}
			</p>
			<p>
				Selection codes {user.age}, {user.city}, {user.ed}, {user.income} and {user.nat}
			</p>
		</div>
		<ul>
			<li><code class="code"><a href="https://github.com/shades87">https://github.com/shades87</a></code> - github</li>
		</ul>
	</div>
</div>
