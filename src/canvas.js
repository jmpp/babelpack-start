export const canvas = document.getElementById('c')
export const context = canvas.getContext('2d')

canvas.width = 1600
canvas.height = 900

// Création d'un deuxième canvas (buffer) sur lequel seront dessinées de manière permanente les dessins de l'utilisateur
export const buffer = document.createElement('canvas')
export const bufferContext = buffer.getContext('2d')

buffer.width = canvas.width
buffer.height = canvas.height
