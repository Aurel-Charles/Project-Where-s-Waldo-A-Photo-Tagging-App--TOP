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
            url : "/images/level1.webp"
        }
    })
    const image2 = await prisma.picture.create({
        data : {
            title : "Tribal Battle",
            url : "/images/level2.webp"
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
    const wenda = await prisma.character.create({
        data : {name : "Wenda"}
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

    // Level 2 : Tribal Battle (same characters, different positions)
    await prisma.characterPosition.create({
        data : {
            pictureId : image2.id,
            characterId : waldo.id,
            x: 96.0,
            y: 6.9
        }
    })

    await prisma.characterPosition.create({
        data : {
            pictureId : image2.id,
            characterId : wizardWhitebeard.id,
            x: 29.5,
            y: 42.6
        }
    })

    await prisma.characterPosition.create({
        data : {
            pictureId : image2.id,
            characterId : odlaw.id,
            x: 91.9,
            y: 59.1
        }
    })

    await prisma.characterPosition.create({
        data : {
            pictureId : image2.id,
            characterId : wenda.id,
            x: 28.1,
            y: 66.3
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