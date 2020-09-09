<template>
    <div class="skeletonContainer">
        <div class="skeletonBox">

        </div>
    </div>
</template>

<style scoped>
.skeletonContainer {
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  top: 80px;
  left: 80px;
  right: 20px;
  bottom: 20px;
  transition: 0.3s;
}
.active .skeletonContainer {
  right: 420px;
}

.skeletonBox {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #D1D1D1;
  height: 100%;
  width: 100%;
}

.skeletonBox::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0));
  -webkit-animation: shimmer 2s infinite;
          animation: shimmer 2s infinite;
  content: "";
}
@-webkit-keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}
@keyframes shimmer {
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
  }
}

@media only screen and (max-width: 1100px) {
  .active .skeletonContainer {right: 20px;}
}
@media only screen and (max-width: 768px) {
  .skeletonContainer {left: 20px;}
}
</style>