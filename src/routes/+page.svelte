<!-- This is how to comment -->
<script lang=ts>
		import { FileDropzone, type ModalSettings } from '@skeletonlabs/skeleton';
		import { TabGroup, Tab } from '@skeletonlabs/skeleton';
		import { getModalStore } from '@skeletonlabs/skeleton';
		import spinner from '$lib/ring-resize-black-36.svg'

		const url = 'https://www.theguardian.com/australia-news/article/2024/jul/08/blockade-australia-climate-activist-sentenced-to-three-months-in-jail-over-port-of-newcastle-protest-ntwnfb'
		let inputURL: string;

		const modalStore = getModalStore();

		let isLoading = false;

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

		const handleURL = () => {

		}

		async function handleSummarize(){
			isLoading = true;
			console.log("In handleSummarize()")
			const api = 'http://127.0.0.1:8000/summariseGPT'
			
			const toSend:JSON = <JSON><unknown>{
        		"url": inputURL,
        		"age": +user.age,
				"nat": +user.nat,
				"income": +user.income,
				"ed": +user.ed,
				"city": +user.city
      		}

			console.log(JSON.stringify(toSend))
			  const response = await fetch(api, {
  				method: 'POST',
  				body: JSON.stringify(toSend),
  				headers: { 'Content-Type': 'application/json'} });

			if (!response.ok) { 
				console.error("HTTP Error: " + response.status);
    			const errorText = await response.text();
    			console.error("Error response text:", errorText);
				isLoading = false
			 }

			// If you care about a response:
			if (response.body !== null) {
				const responseBody = await response.json(); // Parse the JSON response
    			console.log(responseBody);

				// and further:
				const modal: ModalSettings = {
					type: 'alert',
					title: 'Summary',
					body: responseBody.message
				}
				modalStore.trigger(modal);
				isLoading = false;
			}

			
		
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
		<div class="card" style="padding:5px">
			<h1 class="h1" style="text-align: center; justify-contents: center">Enter a URL to a news article</h1>
				<br>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">URL: </div>
					<input type="text" placeholder="https://www.example.com" bind:value={inputURL} />
				</div>

		</div>
		{#if isLoading} 
		 <img class="float-right" src={spinner} alt="loading spinner"/>
		{:else}
			<button type="button" class="btn variant-filled float-right"style="margin: 10px;" on:click={handleSummarize}>summarise!</button>
		{/if}
		<br>
		<bv>
		<br>
		<br>
		<ul>
			<li><code class="code"><a class="text-secondary-500" href="https://github.com/shades87">https://github.com/shades87</a></code> - github</li>
		</ul>
	</div>
</div>
