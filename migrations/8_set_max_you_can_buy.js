const { deployProxy } = require("@openzeppelin/truffle-upgrades");
const TimeBondDepository = artifacts.require("TimeBondDepository");

module.exports = async function (deployer, network) {
    const MAX_AVAILABLE = "5000000000000000000000"; // 5000 OPEN

    const bonds = [
        "0x81a527e2f7c681be45cAaDAa8d2B4fB79264526F",
        "0x3cd17fE894fd57649E2874417dD8f13BD6f5A0EF",
        "0x9a0B623f8fC2A76D73D5c55b2DB8C04628CeD3D1",
        "0xFc658Da47B952223Fbf2AB0a00dCc609d07a2E32",
        "0x0fe9b91992B824427EfDDDF92aF304A56E384EAF",
    ];

    for (let index = 0; index < bonds.length; index++) {
        const address = bonds[index];
        const openBond = await TimeBondDepository.at(address);
        await openBond.setCurrentSale(MAX_AVAILABLE);
    }
};
