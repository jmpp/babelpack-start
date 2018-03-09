import { canvas, context } from './canvas'

export function getCoords(leapPoint, frame) {
    const iBox = frame.interactionBox;
    const normalizedPoint = iBox.normalizePoint(leapPoint, true);

    return {
        x : normalizedPoint[0] * canvas.width,
        y : (1 - normalizedPoint[1]) * canvas.height
    }
}

export function drawHands(frame) {
    frame.hands.forEach(hand => {

        // Dessin de la paume (palm)
        let palm = getCoords(hand.palmPosition, frame)
        context.fillRect( palm.x, palm.y, 10, 10 )

        // Dessin du poignet (wrist)
        context.fillStyle = '#f00'
        let nextJoint = getCoords(hand.arm.nextJoint, frame)
        context.fillRect( nextJoint.x, nextJoint.y, 10, 10 )

        // Dessin des doigts (fingers)
        context.fillStyle = '#000'
        // Stockage des coordonnées des carps et mcp (pour dessiner les jointures)
        let carps = [], mcps = []
        hand.pointables.forEach(finger => {

            // Normalisation des coordonnées
            let carp = getCoords(finger.carpPosition, frame)
            let mcp = getCoords(finger.mcpPosition, frame)
            let pip = getCoords(finger.pipPosition, frame)
            let dip = getCoords(finger.dipPosition, frame)
            let tip = getCoords(finger.tipPosition, frame)

            carps.push(carp)
            mcps.push(mcp)

            // Dessine des lignes entre chaque os du doigt
            context.fillRect( carp.x, carp.y, 5, 5 )
            context.beginPath()
            context.moveTo( mcp.x, mcp.y )
            context.lineTo( pip.x, pip.y )
            context.lineTo( dip.x, dip.y )
            context.lineTo( tip.x, tip.y )
            context.stroke()
            context.closePath()

            // Dessine des points à chaque os du doigt
            context.fillRect( mcp.x, mcp.y, 5, 5 )
            context.fillRect( pip.x, pip.y, 5, 5 )
            context.fillRect( dip.x, dip.y, 5, 5 )
            context.fillRect( tip.x, tip.y, 5, 5 )
        })

        // Dessin des lignes entre les 'carps' (bases du poignet)
        if (carps.length >= 2) {
            context.beginPath()
            context.moveTo( carps[1].x, carps[1].y )
            for (let i = 2; i < carps.length; i++) {
                context.lineTo( carps[i].x, carps[i].y )
            }
            context.stroke()
            context.closePath()
        }

        // Dessin des lignes entre les 'mcps' (bases des doigts)
        if (mcps.length >= 2) {
            context.beginPath()
            context.moveTo( mcps[1].x, mcps[1].y )
            for (let i = 2; i < mcps.length; i++) {
                context.lineTo( mcps[i].x, mcps[i].y )
            }
            context.stroke()
            context.closePath()
        }

    })
}