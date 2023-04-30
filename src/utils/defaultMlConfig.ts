import { ModelConfig, PersonInferenceConfig } from "@tensorflow-models/body-pix/dist/body_pix_model";
import { BodyPixArchitecture } from "@tensorflow-models/body-pix/dist/types";


export type MlSettings = PersonInferenceConfig & ModelConfig

export default function defaultMlConfig(arch?: BodyPixArchitecture) {

    const mobileNetConf = {
        architecture: 'MobileNetV1',
        outputStride: 16,
        quantBytes: 1,
        internalResolution: 'medium',
        segmentationThreshold: 0.4
    } as MlSettings

    const resNetConf = {
        architecture: "ResNet50",
        outputStride: 16,
        quantBytes: 1,
        internalResolution: 'medium',
        segmentationThreshold: 0.4
    } as MlSettings

    return arch == "ResNet50" ? resNetConf : mobileNetConf

}