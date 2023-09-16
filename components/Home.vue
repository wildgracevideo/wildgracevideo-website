<template>
  <div class="mx-auto ytplayer-container">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/yWjmuJ_6mkA?autoplay=1&mute=1&loop=1&showinfo=0&controls=0&playsinline=1&disablekb=1&fs=0&modestbranding=1&playlist=yWjmuJ_6mkA"
      class="ytplayer"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
    />
  </div>
  <div class="grid grid-cols-2 gap-x-8 mx-16 my-12 leading-loose">
    <div>
      <p>
        &#x301D;It has been a pleasant and fruitful experience working with
        Carly. She has developed material that has met my expectations and more.
        Thank you Carly for helping me with my media needs and in a timely
        manner.&#x301E;
      </p>
      <p class="mx-4">Cecelia Mims, Clay Love</p>
    </div>
    <div>
      <p>
        &#x301D;Above and beyond our expectations of quality! The creative
        talent at Wild Grace Videography produced visuals that
        <span class="italic">beautifully</span>
        represent who we are as a brand. The whole process was incredibly easy;
        we simply sent in our product, and the rest was taken care of. I
        wouldn't recommend anyone else!&#x301E;
      </p>
      <p class="mx-4">Justin Little, Blue J Cones</p>
    </div>
  </div>
  <div class="contact-bg pt-8">
    <h2 class="text-white text-3xl text-center">Contact Us</h2>
    <form
      class="grid grid-cols-2 gap-x-4 gap-y-8 mt-12 mx-auto max-w-3xl"
      id="contact-form"
    >
      <div>
        <label for="firstname" class="text-white text-sm block"
          >First Name</label
        >
        <input type="text" id="firstname" class="block text-4xl w-full" />
      </div>
      <div>
        <label for="lastname" class="text-white text-sm block">Last Name</label>
        <input type="text" id="lastname" class="block text-4xl w-full" />
      </div>
      <div class="col-span-2">
        <label for="email" class="text-white text-sm block">Email</label>
        <input type="text" id="email" class="block text-4xl w-full" />
      </div>
      <div class="col-span-2">
        <label for="message" class="text-white text-sm block">Message</label>
        <textarea id="message" rows="3" class="block text-xl w-full" />
      </div>
      <div class="col-span-2 flex justify-center">
        <button
          type="submit"
          class="rounded-oval text-red-100 border-red-100 border-2 py-4 px-16 send-button mb-12"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.ytplayer-container {
  height: 608px;
  width: 1080px;
}
.ytplayer {
  pointer-events: none;
}
.contact-bg {
  background-color: #757263;
}
.rounded-oval {
  border-radius: 50%;
}
.send-button:hover {
  background-color: #fee2e2;
  color: black;
}
</style>
