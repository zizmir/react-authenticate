import { Form, Icon, Input, Button, Checkbox } from "antd";
import React from "react";
import mFetch from "../libs/utils/mFetch";

const FormItem = Form.Item;

class SignIn extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);

        const json = await mFetch("/auth/login", "POST", values);

        this.props.saveUser(json.data.user, json.meta);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("nickname", {
            rules: [{ required: true, message: "Please input your nickname!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="nickname"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SignIn);
