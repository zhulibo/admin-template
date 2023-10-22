<script setup lang="ts">
</script>

<template>
  <div class="ct">
    <svg width="100" height="100">
      <rect x="10" y="10" width="50" height="50" fill="transparent" stroke-width="5" stroke="#333"></rect>
    </svg>
    <svg width="100" height="100">
      <rect x="10" y="10" rx="10" ry="10" width="50" height="50" fill="transparent" stroke-width="5" stroke="#333"></rect>
    </svg>
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="25" fill="transparent" stroke-width="5" stroke="#333"></circle>
    </svg>
    <svg width="100" height="100">
      <ellipse cx="50" cy="50" rx="30" ry="15" fill="transparent" stroke-width="5" stroke="#333"></ellipse>
    </svg>
    <svg width="100" height="100">
      <line x1="10" y1="10" x2="80" y2="80" stroke="#333" stroke-width="5"/>
    </svg>
    <svg width="100" height="100">
      <polyline points="10,20 30,70 90,90" stroke="orange" fill="transparent" stroke-width="5"/>
    </svg>
    <svg width="100" height="100">
      <polygon points="10,20 30,70 90,90" stroke="orange" fill="transparent" stroke-width="5"/>
    </svg>
    <svg width="100" height="100">
      <path d="M10,10 L20,30 H50 V70 L90,90 90,20 Z" fill="red" stroke="blue" stroke-width="5"/>
    </svg>
    <svg width="100" height="100">
      <path d="M10,10 C20,40 40,5 50,20 S60,90 80,40" stroke="#333" fill="transparent"></path>
    </svg>
    <svg width="100" height="100">
      <defs>
        <linearGradient id="linearGradient" x1="0" y1="0" x2="0" y2="0.8">
          <stop offset="0%" stop-color="red"/>
          <stop offset="50%" stop-color="transparent" />
          <stop offset="100%" stop-color="blue" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" fill="url(#linearGradient)" />
    </svg>
    <svg width="100" height="100">
      <defs>
        <radialGradient id="radialGradient" cx="0.4" cy="0.4" r="1">
          <stop offset="0%" stop-color="red" />
          <stop offset="100%" stop-color="blue" />
        </radialGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" fill="url(#radialGradient)" />
    </svg>
    <svg width="100" height="100">
      <g fill="red">
        <rect x="0" y="0" width="10" height="10" />
        <rect x="20" y="0" width="10" height="10" />
      </g>
    </svg>
    <svg width="100" height="100">
      <defs>
        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" width="100" height="50" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#333" clip-path="url(#cut-off-bottom)" />
    </svg>
    <svg width="100" height="100">
      <defs>
        <linearGradient id="Gradient">
          <stop offset="0" stop-color="white" stop-opacity="0" />
          <stop offset="1" stop-color="white" stop-opacity="1" />
        </linearGradient>
        <mask id="Mask">
          <rect x="0" y="0" width="200" height="200" fill="url(#Gradient)" />
        </mask>
      </defs>
      <rect x="0" y="0" width="200" height="200" fill="green" />
      <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#Mask)" />
    </svg>
    <svg width="100" height="100">
      <path fill="none" stroke="#333" d="M10,10 C20,30 20,80 80,60 z" />
      <circle r="5" fill="red">
        <animateMotion dur="4s" repeatCount="indefinite" path="M10,10 C20,30 20,80 80,60 z" />
      </circle>
    </svg>
    <svg width="100" height="100">
    </svg>
    <svg width="100" height="100">
    </svg>
  </div>
</template>

<style lang="pcss" scoped>
.ct{
  min-height: 100vh;
  background-color: #eee;
}
svg{
  margin-left: 10px;
  margin-top: 10px;
  background-color: #ddd;
}
</style>
