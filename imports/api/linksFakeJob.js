import { LinksCollection } from '../db/LinksCollection';

function getRandomLink() {
  const LINKS = [
    'https://www.lempire.com/',
    'https://www.lemlist.com/',
    'https://www.lemverse.com/',
    'https://www.lemstash.com/',
  ]
  const index = Math.floor(Math.random() * LINKS.length);
  return LINKS[index]
}

function exportLinkJob(linkId) {
  const fakeProgress = setInterval(async () => {
    const link = LinksCollection.findOne({ _id: linkId });
    if (!link) {
      clearInterval(fakeProgress);
      return;
    }

    const newProgress = link.progress + 5;
    let update = { progress: newProgress };

    if (newProgress >= 100) {
      update.link = getRandomLink();
      clearInterval(fakeProgress);
    }

    LinksCollection.update(linkId, {
      $set: update,
    });

  }, 1000);
}

export { exportLinkJob };