 <!-- /*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */-->
<script lang=ts>
		import { type ModalSettings } from '@skeletonlabs/skeleton';
		import { getModalStore } from '@skeletonlabs/skeleton';
		import spinner from '$lib/ring-resize-black-36.svg'

		let inputURL: string;

		const modalStore = getModalStore();

		let isLoading = false;

		let model = "1";

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
					age = "15-35";
					break;
				case 3:
					age = "35-65";
					break;
				case 4:
					age = "65+";
					break;
				case 0:
					age = "";
					break;
			}
			
		}
		
		const handleSummarize = () => {
			if (model == "1"){
				handleBERTSummaryRace();
			}

			if (model == "2"){
				handleGPTRace();
			}

			if (model == "3"){
				handleGeminiRace();
			}
			if (model == "4"){
				handleBARTSummaryRace();
			}
		}


		async function handleGeminiRace(){
			try{
				isLoading = true
				const response = await fetchGemini('https://ats-wrapper.onrender.com/summarizeGemini' ,{}, 15000)
				isLoading = false;
					let modalContent= await response.json();
					const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: modalContent.message
						}
					modalStore.trigger(modal);
					isLoading = false;
			}
			catch(error){
				console.error('Fetch error:', error);
				isLoading = false;
				const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: 'Error connecting to server'
					}
					modalStore.trigger(modal);
					isLoading = false;

			}
		}

		function fetchGemini(url: string, options: RequestInit = {}, timeout: number = 15000): Promise<Response>{
			return new Promise((resolve, reject) => {
				const controller = new AbortController();
				const timer = setTimeout(() => {
					controller.abort(); // abort the request
					reject(new Error('Request timed out')); // reject the promise
				}, timeout);

				const toSend:JSON = <JSON><unknown>{
        		"url": inputURL,
        		"age": +user.age,
				"nat": +user.nat,
				"income": +user.income,
				"ed": +user.ed,
				"city": +user.city
      		}
			  fetch(url, {
					method: 'POST',
					body: JSON.stringify(toSend),
					headers: { 'Content-Type': 'application/json'} })
					.then(response => {
						clearTimeout(timer); // clear the timeout if request is successful
						resolve(response);
					})
					.catch(err => {
						if (err.name === 'AbortError') {
							reject(new Error('Request aborted due to timeout'));
						} else {
							reject(err); // other errors
						}
					});

			})
		}

		async function handleGPTRace(){
			try{
				isLoading = true
				const response = await fetchGPT('https://ats-wrapper.onrender.com/summariseGPT' ,{}, 15000)
				isLoading = false;
					let modalContent= await response.json();
					const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: modalContent.message
						}
					modalStore.trigger(modal);
					isLoading = false;
			}
			catch(error){
				console.error('Fetch error:', error);
				isLoading = false;
				const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: 'Error connecting to server'
					}
					modalStore.trigger(modal);
					isLoading = false;

			}
		}

		function fetchGPT(url: string, options: RequestInit = {}, timeout: number = 15000): Promise<Response>{
			return new Promise((resolve, reject) => {
				const controller = new AbortController();
				const timer = setTimeout(() => {
					controller.abort(); // abort the request
					reject(new Error('Request timed out')); // reject the promise
				}, timeout);

				const toSend:JSON = <JSON><unknown>{
        		"url": inputURL,
        		"age": +user.age,
				"nat": +user.nat,
				"income": +user.income,
				"ed": +user.ed,
				"city": +user.city
      		}

			  fetch(url, {
					method: 'POST',
					body: JSON.stringify(toSend),
					headers: { 'Content-Type': 'application/json'} })
					.then(response => {
						clearTimeout(timer); // clear the timeout if request is successful
						resolve(response);
					})
					.catch(err => {
						if (err.name === 'AbortError') {
							reject(new Error('Request aborted due to timeout'));
						} else {
							reject(err); // other errors
						}
					});

			})
		}

		async function handleBARTSummaryRace(){
			try{
					isLoading = true
					const response = await fetchBART('https://ats-wrapper.onrender.com/summariseBART' ,{}, 15000)
					isLoading = false;
					let modalContent= await response.json();
					const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: modalContent.message
						}
					modalStore.trigger(modal);
					isLoading = false;
			}
			catch(error){
				console.error('Fetch error:', error);
				isLoading = false;
				const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: 'Error connecting to server'
					}
					modalStore.trigger(modal);
					isLoading = false;

			}
		}

		function fetchBART(url: string, options: RequestInit = {}, timeout: number = 15000): Promise<Response>{
			return new Promise((resolve, reject) => {
				const controller = new AbortController();
				const timer = setTimeout(() => {
					controller.abort(); // abort the request
					reject(new Error('Request timed out')); // reject the promise
				}, timeout);

				const toSend:JSON = <JSON><unknown>{
					"url": inputURL,
					"age": +user.age,
					"nat": +user.nat,
					"income": +user.income,
					"ed": +user.ed,
					"city": +user.city
				}

				fetch(url, {
					method: 'POST',
					body: JSON.stringify(toSend),
					headers: { 'Content-Type': 'application/json'} })
					.then(response => {
						clearTimeout(timer); // clear the timeout if request is successful
						resolve(response);
					})
					.catch(err => {
						if (err.name === 'AbortError') {
							reject(new Error('Request aborted due to timeout'));
						} else {
							reject(err); // other errors
						}
					});
			});
		}

		async function handleBERTSummaryRace(){
			try {
				isLoading = true
				const response = await fetchBERT('https://ats-wrapper.onrender.com/summariseBERT', {}, 5000);
				isLoading = false;
				let modalContent= await response.json();
				const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: modalContent.message
					}
					modalStore.trigger(modal);
					isLoading = false;
				
				} catch (error) {
				console.error('Fetch error:', error);
				isLoading = false;
				const modal: ModalSettings = {
						type: 'alert',
						title: 'Summary',
						body: 'Error connecting to server'
					}
					modalStore.trigger(modal);
					isLoading = false;
				}
		}

		function fetchBERT(url: string, options: RequestInit = {}, timeout: number = 5000): Promise<Response>{
			return new Promise((resolve, reject) => {
				const controller = new AbortController();
				const signal = controller.signal;
				const timer = setTimeout(() => {
					controller.abort(); // abort the request
					reject(new Error('Request timed out')); // reject the promise
				}, timeout);

				const toSend:JSON = <JSON><unknown>{
					"url": inputURL,
					"age": +user.age,
					"nat": +user.nat,
					"income": +user.income,
					"ed": +user.ed,
					"city": +user.city
				}

				fetch(url, {
					method: 'POST',
					body: JSON.stringify(toSend),
					headers: { 'Content-Type': 'application/json'} })
					.then(response => {
						clearTimeout(timer); // clear the timeout if request is successful
						resolve(response);
					})
					.catch(err => {
						if (err.name === 'AbortError') {
							reject(new Error('Request aborted due to timeout'));
						} else {
							reject(err); // other errors
						}
					});
			});
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
					<option value="4">United States</option>
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
		<div class="float-right">
			<select class="select" style="width: 110px;" bind:value={model}>
				<option value="1" selected>BERT</option>
				<option value="2">ChatGPT</option>
				<option value="3">Gemini</option>
				<option value="4">BART</option>
			</select>
			{#if isLoading} 
			<img src={spinner} alt="loading spinner"/>
			{:else}
				<button type="button" class="btn variant-filled"style="margin: 10px;" on:click={handleSummarize}>summarise!</button>
			{/if}
		</div>
		<br>
		<bv>
		<br>
		<br>
		<ul>
			<li><code class="code"><a class="text-secondary-500" href="https://github.com/shades87">https://github.com/shades87</a></code> - github</li>
		</ul>
	</div>
</div>
