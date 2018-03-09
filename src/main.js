import { Controller } from 'leapjs'
import { canvas, context, buffer, bufferContext } from './canvas.js'
import { getCoords, drawHands } from './utils'

// Création d'un "controlleur" LeapJS
const myController = new Controller()

// Connexion du controlleur au serveur Websocket (lancé par le Leap Service sur l'ordinateur)
myController.connect()

// Fonction déclanchée à chaque "frame" détectée par le Leap Motion (donc environ 60fps)
myController.on('frame', frame => {
    
    // Efface le canvas (avant de redessiner dessus)
    context.clearRect(0, 0, canvas.width, canvas.height)

    // Dessine les mains sur le canvas
    drawHands(frame)

    // Dessine les traits sur le buffer
    frame.hands.forEach(hand => {
        if (hand.pinchStrength > 0.98) {
            let indexFinger = getCoords(hand.indexFinger.tipPosition, frame)

            bufferContext.fillRect(indexFinger.x, indexFinger.y, 15, 15)
        }
    })

    // Dessine le buffer (zone de peinture) sur le canvas
    context.drawImage(buffer, 0, 0, canvas.width, canvas.height)

}) // Fin du on('frame')