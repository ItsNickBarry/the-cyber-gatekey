let main = async function () {
  const [signer] = await ethers.getSigners();

  const interactorFactory = await ethers.getContractFactory('Contract', signer);
  const interactor = await interactorFactory.deploy(ethers.utils.toUtf8Bytes('month infection column conscious'));
  await interactor.deployed();

  console.log('done');
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
