<script lang="ts">
    import { onMount, tick } from "svelte";

    let showNotice = false
    let permissionGranted = false

    async function requestPermission() {
        showNotice = true
        await tick() // show the notice before we requrest the permission
        const permission = await Notification.requestPermission()
        showNotice = false
        return permission
    }
    
    onMount(async () => {
        if (!('Notification' in window)) {
            console.log("This browser does not support the Notification API")
        } else {
            try {
                if (Notification.permission === 'default') {
                    permissionGranted = await requestPermission() === 'granted' ? true : false
                } else if (Notification.permission === 'granted') {
                    await Notification.requestPermission() // let the browser know we'll use it
                    permissionGranted = true
                }
                console.log(permissionGranted)
            } catch (e) {
                showNotice = false
                console.log("This browser does not support the promisified Notification API")
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
    <div class="p-8 bg-neutral-700/30 rounded-lg my-4">
        If you enable the Notification Permission, <br>you will get a notification once the timer goes off.
    </div>
{/if}