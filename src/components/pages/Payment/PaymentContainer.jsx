import React from 'react'
import { Button, Card, Form, Input, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postPayment } from '../../../store/slices/paymentSlice';
import { packagesStateToInitial } from "../../../store/slices/packagesSlice";
import useFormErrors from '../../../hooks/useFormErrors';
import InputMask from "react-input-mask";
import { MaskInput } from '../../core/MaskInput';

export const PaymentContainer = ({ payment }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { totalPrice, selectedPackage } = useSelector((store) => store.packages);
    const { hasErrors, hasNotTouched, onFieldsChange } = useFormErrors();

    const onFinish = (values) => {
        const reqBody = {
            packageIds: [...selectedPackage],
            totalAmount: totalPrice,
            cardNumber: values.cardNumber,
            cardHolderName: values.cardHolderName,
            cvv: values.cvv,
            expireDate: values.expireDate,
        }

        dispatch(postPayment(reqBody))
            .then(response => {
                if (response.type == "postPayment/fulfilled")
                    dispatch(packagesStateToInitial())
                navigate("/successful")
            })
    };

    return (
        <Form
            name='payment'
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
            autoComplete='off'
        >
            <div className='payment_container'>
                <div className='payment_container_card'>
                    <h2>Kart Bilgileri</h2>
                    <div className='payment_container_card_info'>
                        <Card>
                            <div className='payment_container_card_info_user'>
                                <div>
                                    <label>Kart Üzerindeki İsim Soyisim</label>
                                    <Form.Item
                                        name="cardHolderName"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your card holder name!'
                                            }]}
                                    >
                                        <Input size="large" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='payment_container_card_info_detail'>
                                <div>
                                    <label>Kart Numarası</label>
                                    <Form.Item
                                        name="cardNumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your card number!'
                                            },

                                        ]}
                                    >
                                        <MaskInput mask="9999 9999 9999 9999" placeholder="9999 9999 9999 9999" type="text" size="large" />
                                    </Form.Item>
                                </div>
                                <div>
                                    <label>Son Kul. Tar.</label>
                                    <Form.Item
                                        name="expireDate"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your expire date!'
                                            }
                                        ]}
                                    >
                                        <MaskInput mask="99/99" placeholder="12/31" type="text" size="large" />
                                    </Form.Item>
                                </div>
                                <div>
                                    <label>CVV/CVC</label>
                                    <Form.Item
                                        name="cvv"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your cvv!'
                                            },
                                        ]}
                                    >
                                        <MaskInput mask="999" placeholder="123" type="password" size="large" />
                                    </Form.Item>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className='payment_container_card_agreement'>
                        <h2>Sözleşme</h2>
                        <Card>
                            <div className='payment_container_card_agreement_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id arcu ultricies, hendrerit turpis ac, semper justo. Nam orci odio, semper id mauris nec, ornare luctus elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris eu justo sapien. Nullam turpis magna, laoreet at finibus sit amet, ultrices et dolor. Suspendisse vestibulum gravida quam, nec interdum justo pulvinar nec. Aenean quam mauris, fermentum eu iaculis non, egestas a lorem. Sed ante justo, pulvinar dapibus enim id, euismod feugiat arcu. Mauris dictum sed tortor ut placerat. Sed leo ante, laoreet at egestas ut, dapibus et turpis. Duis non enim sed ante aliquet maximus eu et dui. Sed consequat iaculis libero, id pharetra purus blandit vitae. Etiam ut lobortis tortor, sed efficitur tortor. Duis facilisis quam sem, quis pulvinar erat aliquet sit amet. Aliquam velit orci, pellentesque eget varius finibus, sodales quis dolor.</div>
                        </Card>
                    </div>
                </div>
                <div className='payment_container_basket'>
                    <div className='payment_container_basket_title'>Sepetteki Paketler</div>
                    <div className='payment_container_basket_list'>
                        {
                            payment.map((item) => (
                                <div key={item.id} className='payment_container_basket_list_detail'>
                                    <span>{item.name}</span>
                                    <span>{item.amount} {item.currency}</span>
                                </div>
                            ))
                        }
                    </div>
                    <Tooltip
                        placement="top"
                        title={(hasNotTouched || hasErrors) ? "Lütfen tüm alanları eksiksiz ve doğru bir şekilde doldurduğunuzdan emin olun." : ""}>
                        <Button
                            size='large'
                            type="primary"
                            htmlType='submit'
                            block style={{ marginTop: '10px' }}
                            disabled={hasNotTouched || hasErrors}
                        >
                            Ödeme Yap
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Form>
    )
}
