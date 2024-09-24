type Base64urlString = string;
type SchemaLeaf = "copy" | "convert";
interface SchemaObject {
    [property: string]: {
        required: boolean;
        schema: Schema;
    };
}
type SchemaArray = [SchemaObject] | [SchemaLeaf];
type Schema = SchemaLeaf | SchemaArray | SchemaObject;
interface CredPropsAuthenticationExtensionsClientOutputsJSON {
    rk: boolean;
}
interface PublicKeyCredentialDescriptorJSON {
    type: PublicKeyCredentialType;
    id: Base64urlString;
    transports?: AuthenticatorTransport[];
}
interface SimpleWebAuthnExtensionsJSON {
    appid?: string;
    appidExclude?: string;
    credProps?: boolean;
}
interface SimpleClientExtensionResultsJSON {
    appid?: boolean;
    appidExclude?: boolean;
    credProps?: CredPropsAuthenticationExtensionsClientOutputsJSON;
}
interface PublicKeyCredentialUserEntityJSON extends PublicKeyCredentialEntity {
    displayName: string;
    id: Base64urlString;
}
type ResidentKeyRequirement = "discouraged" | "preferred" | "required";
interface AuthenticatorSelectionCriteriaJSON extends AuthenticatorSelectionCriteria {
    residentKey?: ResidentKeyRequirement;
}
interface PublicKeyCredentialCreationOptionsJSON {
    rp: PublicKeyCredentialRpEntity;
    user: PublicKeyCredentialUserEntityJSON;
    challenge: Base64urlString;
    pubKeyCredParams: PublicKeyCredentialParameters[];
    timeout?: number;
    excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
    authenticatorSelection?: AuthenticatorSelectionCriteriaJSON;
    attestation?: AttestationConveyancePreference;
    extensions?: SimpleWebAuthnExtensionsJSON;
}
export interface CredentialCreationOptionsJSON {
    publicKey: PublicKeyCredentialCreationOptionsJSON;
    signal?: AbortSignal;
}
interface AuthenticatorAttestationResponseJSON {
    clientDataJSON: Base64urlString;
    attestationObject: Base64urlString;
}
export interface PublicKeyCredentialWithAttestationJSON {
    id: string;
    type: PublicKeyCredentialType;
    rawId: Base64urlString;
    response: AuthenticatorAttestationResponseJSON;
    clientExtensionResults: SimpleClientExtensionResultsJSON;
}
interface PublicKeyCredentialRequestOptionsJSON {
    challenge: Base64urlString;
    timeout?: number;
    rpId?: string;
    allowCredentials?: PublicKeyCredentialDescriptorJSON[];
    userVerification?: UserVerificationRequirement;
    extensions?: SimpleWebAuthnExtensionsJSON;
}
export interface CredentialRequestOptionsJSON {
    mediation?: CredentialMediationRequirement;
    publicKey?: PublicKeyCredentialRequestOptionsJSON;
    signal?: AbortSignal;
}
interface AuthenticatorAssertionResponseJSON {
    clientDataJSON: Base64urlString;
    authenticatorData: Base64urlString;
    signature: Base64urlString;
    userHandle: Base64urlString | null;
}
export interface PublicKeyCredentialWithAssertionJSON {
    type: PublicKeyCredentialType;
    id: string;
    rawId: Base64urlString;
    response: AuthenticatorAssertionResponseJSON;
    clientExtensionResults: SimpleClientExtensionResultsJSON;
}
export const schema: {
    [s: string]: Schema;
};
export function create(requestJSON: CredentialCreationOptionsJSON): Promise<PublicKeyCredentialWithAttestationJSON>;
export function get(requestJSON: CredentialRequestOptionsJSON): Promise<PublicKeyCredentialWithAssertionJSON>;
export function supported(): boolean;

//# sourceMappingURL=webauthn-json.d.ts.map
