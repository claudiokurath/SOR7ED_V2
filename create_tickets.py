#!/usr/bin/env python3
"""
Stripe Season Tickets - Product & Payment Link Creator
"""

import os
import stripe

# Read API key from environment variable
stripe.api_key = os.environ.get("STRIPE_API_KEY")

if not stripe.api_key:
    print("❌ Error: STRIPE_API_KEY environment variable not set")
    print("Run: export STRIPE_API_KEY='sk_live_yourkey' first")
    exit(1)

def create_season_tickets():
    """Creates all season ticket products and payment links"""

    products = []

    # Full Season Tickets (23 games)
    full_season_tickets = [
        {
            "name": "Full Season Ticket - Adult",
            "description": "23 league games | £11 per game | Adult",
            "price": 25300,
            "metadata": {
                "category": "Full Season",
                "age_group": "Adult",
                "games": "23",
                "price_per_game": "11.00"
            }
        },
        {
            "name": "Full Season Ticket - Over 65s",
            "description": "23 league games | £8.52 per game | Over 65s",
            "price": 19600,
            "metadata": {
                "category": "Full Season",
                "age_group": "Over 65s",
                "games": "23",
                "price_per_game": "8.52"
            }
        },
        {
            "name": "Full Season Ticket - 16-24 Years",
            "description": "23 league games | £6.52 per game | Ages 16-24",
            "price": 15000,
            "metadata": {
                "category": "Full Season",
                "age_group": "16-24",
                "games": "23",
                "price_per_game": "6.52"
            }
        },
        {
            "name": "Full Season Ticket - Under 16s",
            "description": "23 league games | £4.35 per game | Under 16s",
            "price": 10000,
            "metadata": {
                "category": "Full Season",
                "age_group": "Under 16",
                "games": "23",
                "price_per_game": "4.35"
            }
        }
    ]

    # Half Season Tickets (from Boxing Day)
    half_season_tickets = [
        {
            "name": "Half Season Ticket - Adult",
            "description": "From Boxing Day onwards | Adult",
            "price": 16126,
            "metadata": {
                "category": "Half Season",
                "age_group": "Adult",
                "start_date": "Boxing Day",
                "booking_fee": "included"
            }
        },
        {
            "name": "Half Season Ticket - Over 65s",
            "description": "From Boxing Day onwards | Over 65s",
            "price": 12826,
            "metadata": {
                "category": "Half Season",
                "age_group": "Over 65s",
                "start_date": "Boxing Day",
                "booking_fee": "included"
            }
        },
        {
            "name": "Half Season Ticket - 16-24 Years",
            "description": "From Boxing Day onwards | Ages 16-24",
            "price": 9075,
            "metadata": {
                "category": "Half Season",
                "age_group": "16-24",
                "start_date": "Boxing Day",
                "booking_fee": "included"
            }
        },
        {
            "name": "Half Season Ticket - Under 16s",
            "description": "From Boxing Day onwards | Under 16s",
            "price": 6413,
            "metadata": {
                "category": "Half Season",
                "age_group": "Under 16",
                "start_date": "Boxing Day",
                "booking_fee": "included"
            }
        }
    ]

    all_tickets = full_season_tickets + half_season_tickets

    print("🎫 Creating Season Ticket Products & Payment Links...\n")
    print("=" * 60)

    for ticket in all_tickets:
        try:
            # Create Product
            product = stripe.Product.create(
                name=ticket["name"],
                description=ticket["description"],
                metadata=ticket["metadata"]
            )

            # Create Price
            price = stripe.Price.create(
                product=product.id,
                unit_amount=ticket["price"],
                currency="gbp",
            )

            # Create Payment Link
            payment_link = stripe.PaymentLink.create(
                line_items=[{"price": price.id, "quantity": 1}],
                after_completion={
                    "type": "hosted_confirmation",
                    "hosted_confirmation": {
                        "custom_message": "Thank you for purchasing your season ticket! You'll receive confirmation via email."
                    }
                },
                allow_promotion_codes=True,
                billing_address_collection="required",
                phone_number_collection={"enabled": True}
            )

            products.append({
                "name": ticket["name"],
                "product_id": product.id,
                "price_id": price.id,
                "payment_link": payment_link.url,
                "amount": f"£{ticket['price']/100:.2f}"
            })

            print(f"✅ {ticket['name']}")
            print(f"   Amount: £{ticket['price']/100:.2f}")
            print(f"   Link: {payment_link.url}")
            print(f"   Product ID: {product.id}")
            print(f"   Price ID: {price.id}")
            print("-" * 60)

        except Exception as e:
            print(f"❌ Error creating {ticket['name']}: {str(e)}")
            print("-" * 60)

    # Generate summary CSV
    print("\n📋 SUMMARY - Copy to spreadsheet:\n")
    print("Name,Amount,Payment Link,Product ID,Price ID")
    for p in products:
        print(f'"{p["name"]}",{p["amount"]},{p["payment_link"]},{p["product_id"]},{p["price_id"]}')

    return products

if __name__ == "__main__":
    create_season_tickets()
