import React, { useState, useEffect } from "react";
import api from "../../serverless/api";
import { isMobile, isDesktop, isChrome } from "react-device-detect";
import { accountingEmail } from "../../util/config";
import {
    Button,
    message,
    Row,
    Col,
    Form,
    Input,
    Radio,
    Card,
    Upload,
    Select,
} from "antd";
import {
    LoadingOutlined,
    PlusOutlined,
    InboxOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
    updateAddress,
    updateVirtuosoBalance,
    updatePublicKey,
} from "../../appRedux/actions";
import { minaLogin, virtuosoRegisterPublicKey } from "../../blockchain/mina";

import IntlMessages from "util/IntlMessages";

import logger from "../../serverless/logger";
const logm = logger.info.child({ winstonModule: "Verify" });
const { REACT_APP_DEBUG } = process.env;

const { TextArea } = Input;
const { Option } = Select;
const Dragger = Upload.Dragger;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Corporate = () => {
    const address = useSelector(({ blockchain }) => blockchain.address);
    const publicKey = useSelector(({ blockchain }) => blockchain.publicKey);
    const balance = useSelector(({ blockchain }) => blockchain.balance);
    const virtuosoBalance = useSelector(
        ({ blockchain }) => blockchain.virtuosoBalance,
    );
    const dispatch = useDispatch();

    const [form] = Form.useForm();
    const [auth, setAuth] = useState("");

    const log = logm.child({ winstonComponent: "Verify" });

    let vb = "$0";
    let showWithdaw = false;
    if (virtuosoBalance !== undefined) {
        const vb1 = virtuosoBalance / 100;
        vb = " $" + vb1.toString();
        if (vb1 > 100) showWithdaw = true;
    }

    let pb = " is not registered";
    if (publicKey !== undefined && publicKey !== "") pb = " is " + publicKey;

    const beforeUpload = (file) => {
        return false;
    };

    async function register() {
        log.info("Register clicked", { address, wf: "register" });

        if (address !== undefined && address !== "") {
            log.profile(`Registered public key of address ${address}`);
            const key = "RegisterPublicKey";
            message.loading({
                content: `Please provide public key in Metamask and confirm transaction`,
                key,
                duration: 60,
            });

            const result = await virtuosoRegisterPublicKey(address);
            if (result.publicKey !== "" && result.hash !== "") {
                dispatch(updatePublicKey(result.publicKey));
                message.success({
                    content: `Public key ${result.publicKey} is written to blockchain with transaction ${result.hash}`,
                    key,
                    duration: 10,
                });
            } else
                message.error({
                    content: `Public key is not provided or written to blockchain`,
                    key,
                    duration: 10,
                });
            log.profile(`Registered public key of address ${address}`, {
                address,
                result,
                wf: "register",
            });
        }
    }

    async function corporateButton() {
        if (address == "") {
            const myaddress = await minaLogin(true);
            dispatch(updateAddress(myaddress));
        } else
            message.error({
                content: `Thank you for registering your corporate account. Please note that this feature is not implemented yet`,
                key: `CorporateButton`,
                duration: 10,
            });
    }

    async function connect() {
        log.info("Connect clicked", { address, wf: "connect" });
        const newAddress = await minaLogin();
        dispatch(updateAddress(newAddress));
    }

    return (
        <div className="gx-main-content">
            <Row>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Card className="gx-card" title="Create corporate account">
                        <div className="gx-d-flex justify-content-center">
                            <h4>
                                Utilizing our corporate accounts, your employees
                                can access minanft.io website with Auro to
                                generate unique Mina NFTs. These NFTs enable
                                them to:
                                <br />
                                <br />
                                Publish fully verifiable content to the MINA
                                blockchain, ensuring transparency and trust.
                                <br />
                                Keep portions of the content private, giving
                                your team control over data visibility.
                                <br />
                                Generate proofs off-chain and validate them both
                                off-chain and on-chain for any content segment,
                                supporting data integrity.
                                <br />
                                Redact (sanitize) specific pieces of content
                                (such as text, Word files, PNG files), and
                                validate this redacted content on-chain,
                                maintaining security and confidentiality on
                                request of your legal department or commercial
                                department.
                                <br />
                                Use a wide variety of content formats including
                                text, images, videos, audio, and documents,
                                promoting versatility in data representation.
                            </h4>
                        </div>
                        <Form
                            form={form}
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            layout="horizontal"
                        >
                            <div>
                                <Row>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={14}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Form.Item
                                            label="Your corporation or SME name"
                                            name="mina_nft_name"
                                            placeholder="Write name of your corporation or SME"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 1,
                                                    maxRows: 1,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={14}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Form.Item
                                            label="Short description of your business"
                                            name="public_key1"
                                            placeholder="Some string"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 1,
                                                    maxRows: 2,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={14}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Form.Item
                                            label="Contact name"
                                            name="public_value1"
                                            placeholder="Some string (less than 30 chars)"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 1,
                                                    maxRows: 2,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={14}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Form.Item
                                            label="Contact phone"
                                            name="private_key1"
                                            placeholder="Some string (less than 30 chars)"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 1,
                                                    maxRows: 2,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xxl={12}
                                        xl={12}
                                        lg={14}
                                        md={24}
                                        sm={24}
                                        xs={24}
                                    >
                                        <Form.Item
                                            label="Contact e-mail"
                                            name="private_value1"
                                            placeholder="Some string (less than 30 chars)"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 1,
                                                    maxRows: 2,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item
                                            name="KYCdocs"
                                            label="Your KYC docs"
                                        >
                                            <Upload
                                                name="KYC/AML docs"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={true}
                                                multiple={true}
                                                //action="//jsonplaceholder.typicode.com/posts/"
                                                beforeUpload={beforeUpload}
                                                //onChange={this.handleChange}
                                            >
                                                {" "}
                                                <div>
                                                    <PlusOutlined />
                                                    <div className="ant-upload-text">
                                                        private.json
                                                    </div>
                                                </div>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Item
                                        label={
                                            <span>
                                                <span>
                                                    Authorisation code.{" "}
                                                </span>
                                                <span>
                                                    {" "}
                                                    <a
                                                        href="https://t.me/minanft_bot?start=auth"
                                                        target="_blank"
                                                    >
                                                        Get it here
                                                    </a>
                                                </span>
                                            </span>
                                        }
                                        name="auth"
                                        placeholder="Get the code by sending /auth command to telegram bot @MinaNFT_bot"
                                    >
                                        <TextArea
                                            autoSize={{
                                                minRows: 2,
                                                maxRows: 3,
                                            }}
                                        />
                                    </Form.Item>
                                </Row>
                                <Row>
                                    <Form.Item>
                                        <div
                                            className="gx-mt-4"
                                            style={{ whiteSpace: "pre-wrap" }}
                                        >
                                            {address == ""
                                                ? "Please connect with Auro before creating corporate account"
                                                : "You are creating corporate account with AURO address " +
                                                  address}
                                        </div>
                                    </Form.Item>
                                </Row>

                                <Row>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            onClick={corporateButton}
                                        >
                                            {address == ""
                                                ? "Connect with Auro"
                                                : "Create corporate account"}
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Corporate;
