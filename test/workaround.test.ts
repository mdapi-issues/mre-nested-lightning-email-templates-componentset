import { ComponentSetBuilder } from "@salesforce/source-deploy-retrieve";
import { expect } from "chai";

describe("Workarounds for Nested Lightning Email Template Issues", async function () {
  it("resolves a nested Lightning Email Template by incorrect API name", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: [
          "EmailTemplate:level1/level2/template_level2_1714984832364",
        ],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
  });

  it("resolves a nested Lightning Email Folder by incorrect API name and the original EmailFolder type", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailFolder:level1/level2"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
  });

  it("resolves a nested Lightning Email Template using an additional name with wildcard symbol in the ComponentSetBuilder", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: [
          "EmailTemplate:level3/template_level3_1715081809012",
          "EmailTemplate:**/*/level3/template_level3_1715081809012",
        ],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
    // still has the incorrect expanded name
    expect(components[0].name).to.equal(
      "level1/level2/level3/template_level3_1715081809012"
    );
  });

  it("resolves a nested Lightning Email Folder using an additional name with wildcard symbol in the ComponentSetBuilder", async function () {
    const componentSet = await ComponentSetBuilder.build({
      metadata: {
        metadataEntries: ["EmailFolder:level3", "EmailFolder:**/*/level3"],
        directoryPaths: ["force-app"],
      },
    });
    const components = componentSet.getSourceComponents().toArray();
    expect(components.length).to.equal(1, JSON.stringify(components));
    // still has the incorrect expanded name
    expect(components[0].name).to.equal("level1/level2/level3");
  });
});
