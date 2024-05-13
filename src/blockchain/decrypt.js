import logger from "../serverless/logger";
const logm = logger.debug.child({ winstonModule: "payment" });

const { REACT_APP_ARWEAVE_IV, REACT_APP_ARWEAVE_KEY } = process.env;

export async function decrypt() {
  try {
    const params = {
      iv: REACT_APP_ARWEAVE_IV,
      key: REACT_APP_ARWEAVE_KEY,
      data: text,
    };
    const decrypted = await decryptString(params);
    console.log("decrypted", decrypted);
    return decrypted;
  } catch (error) {
    logm.error("decrypt : error: ", error);
    return error;
  }
}

async function decryptString(params) {
  console.log("decryptString", params);
  try {
    let iv = Buffer.from(params.iv, "hex");
    const key = Buffer.from(params.key, "hex");
    let encryptedText = Buffer.from(params.data, "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error(`Error: decryptString ${error}`);
  }
  return undefined;
}

const text =
  "7fccf9ec75774c98131804052c78dfc96b2cec194f3f163f01d247093489d1ee824ea17e668fbb6391d37d9e10cb539e6633f2f9149824b86309ffeddef4959c3ca8261e7754e76e951c70dd15cc00da1131607d4e41b00a3a68c99825be0e6bd74e21773d2e51a0ccc88f98288444e2bfb0743ea8e919dcbddc74e910bcc16eafc19acb5839a2451c6242e5f7c8bc4ebde7c115f88882c120b0d78518c392575da59461705387b933ef54c230c0aad9589a0bfb9e55c34cc3ef7a31de4ad330492b3cb9abfbd945e5e4500a3ad9af885efd3417e59b634492c0ca6c7a33de3cdd9f8d447c6c941ef9cfe159def359227c28996eb4857aa88d4d770f49bd3b7c780bebc92684ed9cc3288e7191eb03133c75e44ce9636810e526bfb7aeae4799985adc20416071811da4348b85dd1ff73d6d23d845e1a396d9773cbb0677bdbd5ceed924e798301fc7ad2253bae6a4c3381752efc619cd4407500e707d89031282719948f794fd3963c2d40fb00fc4f5e68a1f3229c02eb486c4175df63d48c24eed26a501d621dd702dd4aa4c6a19623653b3c28d179aa69a8e6f3dd2cb3e841520b6554d5e9e172748bc98d64c65aff77437ac93d85ac16049dcdbe0a7d8653183e9abdcd11ef0b35473df470a3b0e551794bc8f21a42a8e42180eac1d1f36264fc55b4a264ab54ea48da74c37f884549f1f5f5f1cd26b03591a065880bba27444e2051f1487a1e5e91c102621b51d48bfb5ec8a9774f1821bdd9ee2f8be626862bcdccfa3f7f3c8a3d9f3030a8503e688277ea597332ff4e9995d953eb4bf592ffb9143a537acbd803f28b5724b53878ff1dde4a9c08a949affaa189d3cdd980857c2d9afd919e848ac33e6c036a343e456cf2cb9d3d3dad4a2340df62999ea3f63ed4510926d6ea06dad776e21667de23e610e5859aa0876fbef7108b3bd51a358adfacae411ac58825e8f06c31bc551e82e37d117f775366f45da547b585d1c6a82c4fc29fe97410c450f5ca40621e260853ae6b10862478aa3c386f56a36824ac6bb5d75766d4d7515fa69eed20132ffa12533028c9483cad1dd11097d41733b5efbb8896dfc4faebc90ccfcb4b7c7db663c17fd3edc43aad23b75afe770cece59de85cad3946e8620c58a28e074e551b01287f9f837e1bc3665efde7121d5cfbaa075182ea19d0010f2f160a59c6641f17574d1efbc12b9f5afe7a0653a3bcd7d84e921f2e36c9f5d1a25471a1698a1ac0f7412b838b546708447bdf352b453421313678076906ac98e13f17f308a3b9b3e392f0e89050ac3863bf136a7ea66e7b2658c14c3943d45aabcb1dd13ecba5cc5df44f0a95c22729fc70f39388f3dfd0fee5ae9b31c7a13614c9889c0a14fe9cc43bf49eaae81d52dbdc349d9a96c337988b180b8117ee1acb36156fa8401a19eea515d51c58b551010c21f4b60aa05ff05f4e91edefa2b5866868b2a5a66a0ed17891b926f0461dce215d5c967758c572f1a28e229041274efd988de5a80bdcee13ccf230febb9b7ed2e32edc726912d5c7d722c0eb832c2ecbe61bb88dfa3ba2106a8947635252bd4494af349babf3d46402aabe73a43d0f667e8bcf025e6a19b06659650a726d93745238605e643fd40915af5367abd44cb1a9f894a5fa4eb5f3cc2e23dab8a88ba5a4d8e5662e5dcdebababb59bdf53847c86f502a1c68920d1ba6383d1b3dd995b5a0fa84aa3d46e9b1ad071e8794e352ef3959a2bc97eaa732dea03277266d58e1e28b1a0bd96d3d06fbc53a268aa8a0e25814dcc290e8ce109ebffd397d9758a312b5079de280fa7ca373c162d404f144cc2fe5aaf6a4119dd4560ee629bff47bdcb8ce0d51368faff6821a2912e5e1c0d2442090a85a152b4fa99ff89dc06599a66ccf86b06d214b4d73d08ad126c65f279f31e71eaa74c1a5b917cbb6c9a2c7156dcd645d4f273c34454ca3942452f56ee17bbc4f914266df9a0d164a332f6107705fda34c5f7b0a4c42dfbf5be89188b141cebb0a94eb9170bb601ce560e0c6b836ea011158039d523b860d85e646cc3152606bcdfcbbcfc2720bf4989f41034fb0c58e8d870b3ffa3571f9686ea30cbddee1a0eebcfc44e4315811faebdf94baecbcd69a8298fc340a6371c58f6c4516edae037c313c9a3dbf8eb9e5e6920a96d315a810ee4bb0a7fb48270eb3ef546fcfa6a0594620bdb0df2c4cc85f4a9d97c425316f384832cc17842a0dafe0264a2dba90c5b195a092bdc36dc9eca63808404f6014add82ba4de657edae17ba889f2af6815feb2553bb876a79eb40c5afd3fb900968022aac0df9ae86f01c5f993bda153a2ba358a73fe5eba0040e7852df216fe552f8494f0aacdfda426560433d84929a931b24808438eff53b8855de5434cbf5422b2a0471ea300a2b85c229baf4ff31dfe60f185ffaa5b3956e97879f29d66bbcf696fa648ded1a2d69b1c55a08799baaf729b16b2e9b02b4a778ab41e76f8d0ac95acd985017ec023280b25baac1fc2ae2f178d57b7666a778dd9499d4d14e9202187e0a20ead5ccffe789963cdfed38f2b2dcb5c165aba2226e87940bbc0931048cd963778ee2b373890a5eb0a810d27710bd3d4872040d8b234e47d330c80bbd080aba4e23e289e683030bce2b254388a92aacb5fd7d1db5e52ddc00a3ce8aeb1bc319debb29e60633707c0c0bd19e9441619b2d0a1ea6594853eba869a8482fb483f91d360773afc60d0c792e855a46a46827899d26db9ee546a221a7232cf174dd00f9f63f73c2515fa65ab30eb9ff37b85f6507382e04e3d879fc6fa8122597027f9eded599035afc5809d7aa3dbad0367150a037ecae96ce63fbdd24bfaa4524134ad878052644ae575563f2a7a1142e93d6b5ec72ef29047f326c852fce7ca3de1eb301cbb350a2bbac745af5f53a15ce03b20d205ed39e53a525941fdb035e8b3bb8feb4d48c0386157f7e16e7fbcd417f0ee33b704abab1a70bcbb5a46e79f93104c1e65c1b8bb81227c457d0a19b5671eee6a7ca41cfca0d614868f2a6261864a05730d31847ea5bbc5c88e602e11cb60e9bd3ddc8daeddc6e8395ee1afdefaa851adb8a1d285ad3f556da7719c63f776800a52058f12d1cd0e752fcd9e91dc62abdfdf22e262727963e26c3a90c752cfa028e747b89c497f56377ac5ba55de583aee562cd091c5e71dcb98e3396d4d75b1e0c6555e56b2d619098da1de96ecbdbf77c10348f5c8d66221aab82bed0d55bd497189a5c3a0f74b502d094ecd582dfd2e1c416572d4e5cb2ceac719c8b50ec330682516fafbc29df4e6dc351e42c7eeeaeb5feaad8b322c804a432bfa0cbb397be233250d95023b1696a0e3f6dce75924895df7396ec7c3053aeff10b618a19eb604ee5c0e21b1ec7f7a8367c71002b459c151b8a3b30390eab62461a8f46e59b60773890950bbc9cb8f4445c68e51ddde9e44dc0e4de0b74af0a48f8c5c2976273b231cc9f14880a30ea5c89d5ed9b913bf882089044b59b6d9cdb0b7b8434b0f82f6969305f408ca7014d7f2609b8bd3d245e16766c620c5f4fd319c1761fbb4327f77d9ef5396cb86ecb2c1c1fde8aafe6e4771db3892435dac407b0877501b1343180b6990235e8034e1e664c54f7571bf90b876133a17cdce389c4c9693ca4d2f74e4549f50fd096bc2f2cb494c4cd99a79063f857ff372da84bebf10c7079490da3e16457d4d93129d0d7e3eee6495bd105d02da2a3d5824311c7d264ad18f819245e1c531f80d01c24296ac2b7b15ad99af71c380e637f16162e85b053bad2e3756b0ec5f771731e8a02e1e2368f1370e0d31c4ddc2f04c6133d0a4f628f3117594609c4e4bdeb9d9958300a1fd44fc3d0bfcca1cd47c59debd7f20cd3dc451286e9bc841809476241c4bd193e1bd1bf5f53c1eb4e75cd097d9d50bb1c8974dbaa4d7d6aed42c90319b32d986d786c54b42abe93860cae5183d657da6ce1051f21c6e903ce8691792817328b6ca07c078ca4005acf9c00a87ec622b39f7964822e9e9af4e827e2da8e158e8cdcbfe19d8d2bd5283e0d2cbe68c75cabc2023cbf60455885d385f14ea644ee5d5582bae101eb9e4ad9dbaf0c0810200bde943285f9e16bd9348572891a81c3e7a8a7d649a059a194bd5d412238ba62446941d2c140ac482301459d7624e57b9d4dff509b56c912083b81fa6dde1925a7ed8233247045825231f0a6d0f7950633f68619539732e3f6e43d0c2798b7cf40acadac228d83af19c11c06306182757c976b5ebaca0aab3f718692c1625a1132c74806ead3642843b38800aa359d48f1329681c791d666ca3a4348eead3e259a7ca45e42631d53973912e85832ad199b0a14011ffbf1a507065a5a03daadc47ac5066fe522779ccbd2ee441332ace23283a1e8a80adf141f22d84ad4075926c0e039c1a8130ad1bffbabf7504b25fe66c3a16439a4fd039cfb947641b811ca0b25c082884";
