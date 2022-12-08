---
title: "Terraform ☁️"
date: 2022-08-28T23:27:25+02:00
draft: false
hideLastModified: true
summaryImage: "img/terraform.png"
keepImageRatio: true
summary: "Terraform ist ein Tool zum Wolken bauen. Ein erster Einblick im Zusammenspiel mit Digital Ocean"
showInMenu: false
tags: ["Cloud"]
---

Terraform ermöglicht es, seine Infrastruktur als Code abzubilden. Und ist gedacht für große Cloud Instanzen.
Hier ein kleiner Erfahrungsbericht vom ersten mal Terraform.

Ich werde hier zeigen, wie man VMs bei Digital Ocean anlegt und auf ihr dann [Juice Shop](https://owasp.org/www-project-juice-shop/) zum laufen bringt und das mit Hilfe von Terraform.
Hinweis: Juice Shop ist ein Projekt das Web Schwachstellen in sich drin hat, dies ist ein Produkt zum Lernen und nicht für den produktiven Einsatz gedacht.

## Instalation
Terraform zu installieren ist wohl das einfachste, unter Ubuntu einfach folgendes: 

{{< codeWide >}}
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg]https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
{{< /codeWide >}}

## Aufbau eines Terraform Files
Der Aufbau sieht wie folgt aus, wir schreiben Code in ein File den Terraform dann ausführt.

### Provider festlegen
Der wohl "schwierigste" Part ist den Provider einzurichten. Es ist wichtig mit wem Terraform dann redet, die bekanntesten Anbieter für Cloud sind wahrscheinlich Amazon's aws und Microsofts Azure.
Neben diesen gibt es aber auch viele weitere Provider, es ist auch möglich mit seiner eigenen Cloud zu reden z.B. mir K8S, VMware oder auch Proxmox.

Ich habe mich in meinem Test für [Digital Ocean](https://www.digitalocean.com) entschieden. Es ist nicht sehr günstig, aber ab und zu gibt es Rabatt Codes, um deren Produkte zu testen.
Es ist ein recht kleiner Cloud Anbieter der nicht so ein Komplexe Struktur wie AWS hat.

Nun zu Terraform, zu Beginn legen wir eine `main.tf` an.
Den Provider Code findet man dann in der Terraform Doku. Für Digital Ocean sieht der erst mal so aus:

{{< codeWide >}}
terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}
{{< /codeWide >}}

Danach müssen wir einen Token in Digital Ocean  erstellen, dieser erlaubt es Terraform dann unter euren Account, auf die Cloud zuzugreifen.
Natürlich müssen wir diesen Token dann auch Terraform mitteilen, hierfür gibt es verschiedene Methoden, da so sensible Daten nicht direkt im Code stehen sollten.
Der einfach halt halber hab ich ihn erst mal in den Code geschrieben:

{{< codeWide >}}
provider "digitalocean" {
  token = ""
}
{{< /codeWide >}}

Bei "" dann den Token eintragen.

### Ressourcen anlegen 
Nun können wir unsere Ressourcen bestimmen, hier ist es ein Droplet, was der Bergriff für VM bei Digital Ocean ist.

{{< codeWide >}}
resource "digitalocean_droplet" "web" {
  count  = 1
  image  = "ubuntu-22-04-x64"
  name   = "saftig.${count.index}"
  region = "fra1"
  size   = "s-1vcpu-1gb"
  ssh_keys = [""]
{{< /codeWide >}}

Der `count` gibt an wie viele VMs erzeugt werden sollen, dies ist optional. Ich habe das ergänzt, um mal zu sehen, wie es ist mehre VWs gleichzeitig zu erstellen. So wie ich das sehe, ist hier eine 
der Stärken von Terraform, es macht genauso viel Aufwand zwei WMs zu erzeugen wie 200.

Bei den `ssh_keys` müssen die Fingerprints der ssh keys eingetragen werden. diese müssen aber schon bei Digital Ocean hinterlegt sein.

### Connection definieren

Um nun Commands auf den Servern auszuführen, muss die Verbindung aufgebaut werden, dies passiert über ssh.

{{< codeWide >}}
connection {
    host = self.ipv4_address
    user = "root"
    type = "ssh"
    private_key = file("")
    timeout = "2m"
  }
{{< /codeWide >}}

Bei `private_key` muss der Path zum File eingetragen werden.


Es folgen nun die Commands, die nach dem Erstellen der VM ausgeführt werden.

{{< codeWide >}}
provisioner "remote-exec" {
    inline = [
      "export PATH=$PATH:/usr/bin",
      # install Juice Shop
      "sudo apt install -y podman",
      "sudo podman pull docker.io/bkimminich/juice-shop",
      "sudo podman run -d --rm -p 3000:3000 bkimminich/juice-shop"
    ]
  }
}
{{< /codeWide >}}

Hier wird mit `podman` der Container von Juice Shop geladen und ausgeführt.

## Terraform Commands
Die Terraform Commands sind ähnlich wie git aufgebaut. Es gibt der `terraform` command und dieser hat verschiedene sub commands.

Mit `apply` können wir nun unseren Code ausrollen:
{{< codeWide >}}
terraform apply
{{< /codeWide >}}

Unser aktuelles Deployment können wir `show` ansehen:
{{< codeWide >}}
terraform show
{{< /codeWide >}}

Mit `destroy` können wir unser Werk auch wieder schnell zerstören.
{{< codeWide >}}
terraform destroy
{{< /codeWide >}}

## Fazit
Ich war sehr positiv beeindruckt, wie einfach der Einstieg in Terraform ist. Ich kann mir vorstellen, daß ich das in Zukunft noch öfter für Projekte einsetzen werde.