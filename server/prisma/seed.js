import { prisma } from "../src/db/prisma.js";


async function main() {
    await prisma.foundCharacter.deleteMany()
    await prisma.characterPosition.deleteMany()
    await prisma.game.deleteMany()
    await prisma.character.deleteMany()
    await prisma.picture.deleteMany()

    const image = await prisma.picture.create({
        data : {
            title : "The Beach",
            url : "client/src/assets/level1.webp"
        }
    })

    const waldo = await prisma.character.create({
        data : {name : "Waldo"}
    })
    const odlaw = await prisma.character.create({
        data : {name : "Odlaw"}
    })
    const wizardWhitebeard = await prisma.character.create({
        data : {name : "Wizard Whitebeard"}
    })

    const waldoPosition = await prisma.characterPosition.create({
        data : {
            pictureId : image.id,
            characterId : waldo.id,
            x: 53.05,
            y: 48.56
        }
    })

    const odlawPosition = await prisma.characterPosition.create({
        data : {
            pictureId : image.id,
            characterId : odlaw.id,
            x: 24.50,
            y: 48.66
        }
    })

    const wizardWhitebeardPosition = await prisma.characterPosition.create({
        data : {
            pictureId : image.id,
            characterId : wizardWhitebeard.id,
            x: 62.54,
            y: 48.56
        }
    })
}

try {
    await main()
    console.log("🌱 Seed completed")
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }