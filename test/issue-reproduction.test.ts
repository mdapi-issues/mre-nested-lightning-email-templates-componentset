import { ComponentSetBuilder } from "@salesforce/source-deploy-retrieve";
import { expect } from "chai";

describe("Reproduction of Nested Lightning Email Template Issues", async function () {
  it("does not resolve a nested Lightning Email Folder by correct API name", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailFolder:level2"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(0, JSON.stringify(components));
  });
  it("does not resolve a nested Lightning Email Template by correct API name", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailTemplate:level2/template_level2_1714984832364"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(0, JSON.stringify(components));
  });
});
