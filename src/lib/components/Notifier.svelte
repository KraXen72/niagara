<script lang="ts">
    import { onMount } from "svelte";

    let showNotice = false
    let permissionGranted = false
    let notificationSupported = true

    async function triggerPermissionRequest() {
        if (notificationSupported) {
            try {
                if (Notification.permission === 'default') {
                    permissionGranted = await Notification.requestPermission() === 'granted' ? true : false
                    showNotice = false
                }
                console.log(permissionGranted)
            } catch (e) {
                showNotice = false
                console.log("This browser does not support the promisified Notification API")
                notificationSupported = false
            }
        }
    }
    
    onMount(async () => {
        if (!('Notification' in window)) {
            console.log("This browser does not support the Notification API")
            notificationSupported = false
        } else {
            if (Notification.permission === 'default') { 
                showNotice = true 
            } else if (Notification.permission === 'granted') {
                await Notification.requestPermission() // let the browser know we'll use it
                permissionGranted = true
            }
        }
    })

</script>

<script context="module" lang="ts">
    export function timerEndNotification(timerLength: string) {
        new Notification('niagara', {
            body: `Time's up! Your timer for ${timerLength} has gone off.`,
            icon: '/favicon.png'
        })
    }
</script>

<style>
	/* your styles go here */
</style>

{#if showNotice}
    <div class="flex gap-3 align-middle justify-center">
        <span>Enable notifications once timer goes off?</span>
        <button class="bg-neutral-800/50 px-3.5 rounded-full hover:bg-neutral-600/50" on:click={triggerPermissionRequest}>Enable</button>
    </div>
{/if}