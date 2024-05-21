import { ComponentSetBuilder } from "@salesforce/source-deploy-retrieve";
import { expect } from "chai";

describe("Verfication of Lightning Email Templates", async function () {
  it("resolves a top-level EmailTemplate", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailTemplate:level1/template_level1_1714984698883"],
        directoryPaths: ["force-app"],
      },
    });
    expect(componentSet.getSourceComponents().toArray().length).to.equal(1);
  });
  it("resolves a top-level EmailFolder", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailFolder:level1"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
  });
  it("resolves a top-level LightningEmailFolder", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailFolder:level1"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
  });
});
