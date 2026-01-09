from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import orders.models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="order_id",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                unique=True,
                db_index=True,
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="order_code",
            field=models.CharField(
                default=orders.models.generate_order_code,
                editable=False,
                max_length=16,
                unique=True,
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="customer_name",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.AddField(
            model_name="order",
            name="address",
            field=models.CharField(default="N/A", max_length=255),
        ),
        migrations.AddField(
            model_name="order",
            name="city",
            field=models.CharField(default="N/A", max_length=100),
        ),
        migrations.AddField(
            model_name="order",
            name="postal_code",
            field=models.CharField(default="0000", max_length=20),
        ),
        migrations.AddField(
            model_name="order",
            name="payment_method",
            field=models.CharField(
                choices=[
                    ("cash", "Cash"),
                    ("card", "Card"),
                    ("bkash", "bKash"),
                    ("nagad", "Nagad"),
                ],
                default="cash",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="order_status",
            field=models.CharField(
                choices=[
                    ("to_pay", "To Pay"),
                    ("purchased", "Purchased"),
                    ("warehouse", "At Warehouse"),
                    ("way", "Way to destination"),
                    ("received", "Received"),
                    ("courier", "At Courier"),
                    ("completed", "Completed"),
                    ("refund", "Refund"),
                    ("cancelled", "Cancelled"),
                ],
                default="to_pay",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="payment_status",
            field=models.CharField(
                choices=[
                    ("unpaid", "Unpaid"),
                    ("paid", "Paid"),
                    ("refunded", "Refunded"),
                    ("partial", "Partial"),
                ],
                default="unpaid",
                max_length=20,
            ),
        ),
        migrations.AddField(
            model_name="order",
            name="ship_to_country",
            field=models.CharField(default="Bangladesh", max_length=80),
        ),
        migrations.AddField(
            model_name="order",
            name="shipping_method",
            field=models.CharField(default="Cargo - By Air", max_length=80),
        ),
        migrations.AddField(
            model_name="order",
            name="shipping_company",
            field=models.CharField(default="ExBuy Global Shipping", max_length=120),
        ),
        migrations.AddField(
            model_name="order",
            name="shipping_cost",
            field=models.CharField(default="0/kg", max_length=40),
        ),
        migrations.AddField(
            model_name="order",
            name="total",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name="order",
            name="updated_at",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.CreateModel(
            name="OrderItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=100)),
                ("price", models.DecimalField(decimal_places=2, max_digits=10)),
                ("qty", models.PositiveIntegerField()),
                ("product_no", models.CharField(blank=True, default="", max_length=40)),
                ("category", models.CharField(blank=True, default="", max_length=80)),
                ("weight", models.CharField(blank=True, default="", max_length=40)),
                ("image_url", models.CharField(blank=True, default="", max_length=255)),
                (
                    "order",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="orders.order"),
                ),
            ],
        ),
    ]
