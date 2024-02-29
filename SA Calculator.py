from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput


class CalculatorApp(App):
    def build(self):
        self.expression = ""
        self.result_text = TextInput(
            multiline=False, readonly=True, halign="right", font_size=32
        )

        layout = GridLayout(cols=4, spacing=10, size_hint=(1, 0.6))
        layout.add_widget(Button(text="7", on_press=self.button_press))
        layout.add_widget(Button(text="8", on_press=self.button_press))
        layout.add_widget(Button(text="9", on_press=self.button_press))
        layout.add_widget(Button(text="/", on_press=self.button_press))

        layout.add_widget(Button(text="4", on_press=self.button_press))
        layout.add_widget(Button(text="5", on_press=self.button_press))
        layout.add_widget(Button(text="6", on_press=self.button_press))
        layout.add_widget(Button(text="*", on_press=self.button_press))

        layout.add_widget(Button(text="1", on_press=self.button_press))
        layout.add_widget(Button(text="2", on_press=self.button_press))
        layout.add_widget(Button(text="3", on_press=self.button_press))
        layout.add_widget(Button(text="-", on_press=self.button_press))

        layout.add_widget(Button(text="(", on_press=self.button_press))
        layout.add_widget(Button(text="0", on_press=self.button_press))
        layout.add_widget(Button(text=")", on_press=self.button_press))
        layout.add_widget(Button(text="+", on_press=self.button_press))

        layout.add_widget(Button(text="C", on_press=self.clear))
        layout.add_widget(Button(text=".", on_press=self.button_press))
        layout.add_widget(Button(text="=", on_press=self.calculate))

        main_layout = BoxLayout(orientation="vertical", spacing=10, padding=10)
        main_layout.add_widget(self.result_text)
        main_layout.add_widget(layout)

        return main_layout

    def button_press(self, instance):
        current_text = self.result_text.text
        button_text = instance.text

        if button_text == "C":
            self.clear()
        else:
            self.expression += button_text
            self.result_text.text = self.expression

    def clear(self, instance=None):
        self.expression = ""
        self.result_text.text = ""

    def calculate(self, instance):
        try:
            self.expression = str(eval(self.expression))
            self.result_text.text = self.expression
        except Exception:
            self.result_text.text = "Error"


if __name__ == "__main__":
    CalculatorApp().run()
